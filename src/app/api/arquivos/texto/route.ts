import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

export async function GET() {
    try {
        const { blobs } = await list({ prefix: 'secret_note.txt', limit: 1 });
        if (blobs.length === 0) {
            return NextResponse.json({ text: '' });
        }

        const res = await fetch(blobs[0].url);
        const text = await res.text();
        return NextResponse.json({ text });
    } catch (e: any) {
        console.error('Erro ao ler texto Vercel Blob:', e);
        return NextResponse.json({ error: `Erro ao ler: ${e.message}` }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        await put('secret_note.txt', text, {
            access: 'public',
            contentType: 'text/plain',
            addRandomSuffix: false, // ensures we overwrite the same file
        });

        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error('Erro ao salvar texto Vercel Blob:', e);
        return NextResponse.json({ error: `Erro ao salvar: ${e.message}` }, { status: 500 });
    }
}
