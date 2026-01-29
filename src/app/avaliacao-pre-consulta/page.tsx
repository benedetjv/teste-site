import PreConsultationForm from '@/components/PreConsultationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Avaliação Pré-Consulta | Dr. Otto Beckedorff',
    description: 'Realize seu mapeamento de dor detalhado antes da consulta para um atendimento de precisão.',
};

export default function PreConsultationPage() {
    return (
        <main className="min-vh-100 bg-light py-5">
            <PreConsultationForm />
        </main>
    );
}
