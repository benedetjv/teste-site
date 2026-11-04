import { NextResponse } from 'next/server';
import { 
  getDatabasePool, 
  getSessionSecret, 
  verifyTOTP, 
  createSessionToken 
} from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !body.challenge_token || !body.code) {
      return NextResponse.json({ error: 'Token de desafio e código MFA são obrigatórios.' }, { status: 400 });
    }

    // 1. Decrypt challenge token
    const parts = body.challenge_token.split('.');
    if (parts.length !== 3) {
      return NextResponse.json({ error: 'Desafio inválido ou corrompido.' }, { status: 400 });
    }

    const [ivHex, tagHex, encryptedHex] = parts;
    const secret = getSessionSecret();
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', secret, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const payload = JSON.parse(decrypted.toString('utf8'));

    if (Date.now() > payload.exp) {
      return NextResponse.json({ error: 'O tempo limite do desafio expirou. Faça login novamente.' }, { status: 401 });
    }

    // 2. Lookup user and verify TOTP
    const pool = getDatabasePool();
    const userRes = await pool.query('SELECT * FROM admin_users WHERE id = $1', [payload.uid]);
    if (userRes.rows.length === 0) {
      return NextResponse.json({ error: 'Operador não encontrado.' }, { status: 404 });
    }

    const user = userRes.rows[0];
    const isMfaValid = verifyTOTP(user.totp_secret, body.code);
    if (!isMfaValid) {
      return NextResponse.json({ error: 'Código de autenticação MFA inválido.' }, { status: 401 });
    }

    // 3. Update last login
    await pool.query('UPDATE admin_users SET last_login_at = NOW() WHERE id = $1', [user.id]);

    // 4. Create encrypted HttpOnly session cookie
    const sessionToken = createSessionToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

    // Set HttpOnly, Secure SameSite=Strict cookie
    response.cookies.set({
      name: 'admin_session',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/admin',
      maxAge: 8 * 60 * 60 // 8 hours
    });

    return response;
  } catch (err: any) {
    console.error('[Verify MFA Error]', err);
    return NextResponse.json({ error: 'Falha na validação do segundo fator.' }, { status: 500 });
  }
}

