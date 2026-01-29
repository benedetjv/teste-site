import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { patientEmail, reportContent, subject } = await request.json();

        // Validação básica
        if (!patientEmail || !reportContent) {
            return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
        }

        const data = await resend.emails.send({
            from: 'Pré-Consulta Dr. Otto <agendamento@drotto.com.br>', // Domínio verificado
            to: [process.env.DOCTOR_EMAIL || 'drottobeckedorff@gmail.com'], // E-mail para onde o relatório será enviado
            replyTo: patientEmail,
            subject: subject || 'Novo Relatório de Pré-Consulta',
            text: `
        Novo pré-agendamento recebido:
        
        Paciente (Email): ${patientEmail}
        
        --- RELATÓRIO DO PACIENTE ---
        
        ${reportContent}
      `,
        });

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Resend Error:", error);
        return NextResponse.json({ error: error.message || 'Erro interno no envio' }, { status: 500 });
    }
}
