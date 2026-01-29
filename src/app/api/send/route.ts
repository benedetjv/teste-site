import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { patientEmail, patientName, reportContent, subject, attachments } = await request.json();

        // Validação básica
        if (!patientEmail || !reportContent) {
            return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
        }

        const data = await resend.emails.send({
            from: 'Pré-Consulta <onboarding@resend.dev>', // Sempre funciona em modo de teste
            to: ['drottobeckedorff@gmail.com'], // Forçando o email do médico para teste
            replyTo: patientEmail,
            subject: subject || 'Novo Relatório de Pré-Consulta',
            text: `
        Novo pré-agendamento recebido:
        
        Paciente: ${patientName}
        Email: ${patientEmail}
        
        --- RELATÓRIO DO PACIENTE ---
        
        ${reportContent}
      `,
            attachments: attachments // Anexos (agora tratados como { filename, content })
        });

        console.log("Email enviado com sucesso:", data);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Resend Error:", error);
        return NextResponse.json({ error: error.message || 'Erro interno no envio' }, { status: 500 });
    }
}
