import { NextResponse } from 'next/server';
import { getDownloadUrl } from '@vercel/blob';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json({ error: 'URL não fornecida' }, { status: 400 });
        }

        // Gera uma URL assinada temporária (token de leitura)
        // Isso permite o download de um blob privado sem expor o token global
        const downloadUrl = getDownloadUrl(url);

        return NextResponse.json({ url: downloadUrl });
    } catch (e: any) {
        console.error('Erro ao gerar link:', e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
