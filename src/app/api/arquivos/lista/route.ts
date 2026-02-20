import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
    try {
        const { blobs } = await list({ prefix: 'arquivos-pessoais/' });

        const filesStats = blobs.map(blob => {
            return {
                name: blob.pathname.replace('arquivos-pessoais/', ''),
                url: blob.url,
                size: blob.size,
                mtime: new Date(blob.uploadedAt).getTime()
            }
        });

        // Ordenar os arquivos por data (mais recente primeiro)
        filesStats.sort((a, b) => b.mtime - a.mtime);

        return NextResponse.json({ files: filesStats });

    } catch (e: any) {
        console.error('Erro na lista Vercel Blob:', e);
        return NextResponse.json({ error: `Erro ao ler arquivos: ${e.message}`, files: [] }, { status: 500 });
    }
}
