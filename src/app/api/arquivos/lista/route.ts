import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public/arquivos-pessoais');

export async function GET() {
    try {
        if (!fs.existsSync(UPLOAD_DIR)) {
            return NextResponse.json({ files: [] });
        }

        const filesStats = fs.readdirSync(UPLOAD_DIR).map(f => {
            const filePath = path.join(UPLOAD_DIR, f);
            const stats = fs.statSync(filePath);
            return {
                name: f,
                url: `/arquivos-pessoais/${f}`,
                size: stats.size,
                mtime: stats.mtime.getTime()
            }
        });

        // Ordenar os arquivos por data (mais recente primeiro)
        filesStats.sort((a, b) => b.mtime - a.mtime);

        return NextResponse.json({ files: filesStats });

    } catch (e) {
        console.error('Erro na lista:', e);
        return NextResponse.json({ error: 'Erro ao ler arquivos', files: [] }, { status: 500 });
    }
}
