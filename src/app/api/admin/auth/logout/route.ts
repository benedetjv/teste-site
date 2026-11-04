import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Sessão encerrada com segurança.' });
  response.cookies.set({
    name: 'admin_session',
    value: '',
    httpOnly: true,
    path: '/api/admin',
    maxAge: 0
  });
  return response;
}

