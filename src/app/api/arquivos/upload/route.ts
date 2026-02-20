import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'Nenhum arquivo válido enviado.' }, { status: 400 });
        }

        // Vercel Blob takes a File object directly
        const safeName = file.name.replace(/\s+/g, '-');

        // Put the file into Vercel Blob Storage
        const blob = await put(`arquivos-pessoais/${safeName}`, file, {
            access: 'public', // this ensures it is available for downloading
        });

        return NextResponse.json({ success: true, url: blob.url });
    } catch (error: any) {
        console.error('Erro no upload Vercel Blob:', error);
        return NextResponse.json({ error: `Erro no upload Vercel Blob: ${error.message || error}` }, { status: 500 });
    }
}
