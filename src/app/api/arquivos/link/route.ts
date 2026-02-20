import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const fileUrl = searchParams.get('url');

        if (!fileUrl) {
            return new Response('URL não fornecida', { status: 400 });
        }

        // Faz o fetch do arquivo no Vercel Blob usando o Token administrativo
        const response = await fetch(fileUrl, {
            headers: {
                Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`
            }
        });

        if (!response.ok) {
            return new Response('Erro ao buscar arquivo no Blob', { status: response.status });
        }

        // Pega o nome do arquivo da URL para o header de download
        const urlObj = new URL(fileUrl);
        const fileName = urlObj.pathname.split('/').pop() || 'arquivo';

        // Retorna o stream do arquivo diretamente para o usuário
        return new Response(response.body, {
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Cache-Control': 'no-store, max-age=0'
            }
        });

    } catch (e: any) {
        console.error('Erro no proxy de download:', e);
        return new Response('Erro interno no servidor', { status: 500 });
    }
}
