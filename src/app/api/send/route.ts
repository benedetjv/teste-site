import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { patientEmail, patientName, reportContent, subject, attachments } = await request.json();

        // Validação básica
        if (!reportContent) {
            return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
        }

        const emailOptions: any = {
            from: 'Pré-Consulta <onboarding@resend.dev>', // Sempre funciona em modo de teste
            to: ['drottobeckedorff@gmail.com'], // Forçando o email do médico para teste
            subject: subject || 'Novo Relatório de Pré-Consulta',
            text: `
        Novo pré-agendamento recebido:
        
        Paciente: ${patientName || 'Não informado'}
        Email: ${patientEmail || 'Não informado'}
        
        --- RELATÓRIO DO PACIENTE ---
        
        ${reportContent}
      `,
            attachments: attachments
        };

        if (patientEmail) {
            emailOptions.replyTo = patientEmail;
        }

        // Processar anexos para garantir formato correto (Buffer)
        if (attachments && Array.isArray(attachments)) {
            emailOptions.attachments = attachments.map((att: any) => {
                // Se o conteúdo for uma string base64 com prefixo de Data URI (ex: data:image/png;base64,...)
                if (typeof att.content === 'string' && att.content.includes('base64,')) {
                    const base64Content = att.content.split('base64,')[1];
                    return {
                        filename: att.filename,
                        content: Buffer.from(base64Content, 'base64'),
                    };
                }
                return att;
            });
        }

        const data = await resend.emails.send(emailOptions);

        console.log("Email enviado com sucesso:", data);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Resend Error:", error);
        return NextResponse.json({ error: error.message || 'Erro interno no envio' }, { status: 500 });
    }
}
