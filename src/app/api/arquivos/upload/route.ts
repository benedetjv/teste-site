import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';

// Using public directory so it's directly accessible
const UPLOAD_DIR = path.join(process.cwd(), 'public/arquivos-pessoais');

export async function POST(req: Request) {
    try {
        if (!fs.existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
        }

        const formData = await req.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'Nenhum arquivo válido enviado.' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Clean filename removing spaces to prevent issues
        const safeName = file.name.replace(/\s+/g, '-');
        const filePath = path.join(UPLOAD_DIR, safeName);

        await writeFile(filePath, buffer);

        return NextResponse.json({ success: true, url: `/arquivos-pessoais/${safeName}` });
    } catch (error: any) {
        console.error('Erro no upload:', error);
        return NextResponse.json({ error: `Erro no upload: ${error.message || error}` }, { status: 500 });
    }
}
