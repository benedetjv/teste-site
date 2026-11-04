import { NextResponse } from 'next/server';
import { verifyAdminCredentials, checkRateLimit, getSessionSecret } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Muitas tentativas. Aguarde 10 minutos.' }, { status: 429 });
    }

    const body = await request.json().catch(() => null);
    if (!body || !body.email || !body.password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 });
    }

    const user = await verifyAdminCredentials(body.email, body.password);
    if (!user) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
    }

    // Generate short-lived MFA challenge token (valid for 5 minutes)
    const secret = getSessionSecret();
    const challengePayload = JSON.stringify({
      uid: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 5 * 60 * 1000
    });

    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', secret, iv);
    const encrypted = Buffer.concat([cipher.update(challengePayload, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    const challengeToken = `${iv.toString('hex')}.${tag.toString('hex')}.${encrypted.toString('hex')}`;

    return NextResponse.json({
      success: true,
      mfa_required: true,
      challenge_token: challengeToken,
      email: user.email
    });
  } catch (err: any) {
    console.error('[Admin Login Error]', err);
    return NextResponse.json({ error: 'Falha na autenticação administrativa.' }, { status: 500 });
  }
}

