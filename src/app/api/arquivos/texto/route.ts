import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'secret_note.txt');

export async function GET() {
    try {
        if (!fs.existsSync(dataFile)) {
            return NextResponse.json({ text: '' });
        }
        const text = fs.readFileSync(dataFile, 'utf-8');
        return NextResponse.json({ text });
    } catch (e) {
        return NextResponse.json({ error: 'Erro ao ler' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { text } = await req.json();
        fs.writeFileSync(dataFile, text, 'utf-8');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 });
    }
}
