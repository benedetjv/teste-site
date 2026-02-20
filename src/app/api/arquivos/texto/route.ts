import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

export async function GET() {
    try {
        const { blobs } = await list({ prefix: 'secret_notes.json', limit: 1 });
        if (blobs.length === 0) {
            return NextResponse.json({ notes: [] });
        }

        const res = await fetch(blobs[0].url, {
            headers: {
                Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`
            }
        });
        const text = await res.text();
        const notes = text ? JSON.parse(text) : [];
        return NextResponse.json({ notes });
    } catch (e: any) {
        console.error('Erro ao ler notas Vercel Blob:', e);
        return NextResponse.json({ error: `Erro ao ler: ${e.message}` }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { notes } = await req.json();

        await put('secret_notes.json', JSON.stringify(notes), {
            access: 'private',
            contentType: 'application/json',
            addRandomSuffix: false, // ensures we overwrite the same file
        });

        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error('Erro ao salvar notas Vercel Blob:', e);
        return NextResponse.json({ error: `Erro ao salvar: ${e.message}` }, { status: 500 });
    }
}
