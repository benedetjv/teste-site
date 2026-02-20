import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';

export async function POST(req: Request) {
    try {
        const { url } = await req.json();
        if (!url) {
            return NextResponse.json({ error: 'Nenhuma URL fornecida.' }, { status: 400 });
        }
        await del(url);
        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: `Erro ao deletar: ${e.message}` }, { status: 500 });
    }
}
