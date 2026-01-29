import PreConsultationForm from '@/components/PreConsultationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Avaliação Pré-Consulta | Dr. Otto Beckedorff',
    description: 'Realize seu mapeamento de dor detalhado antes da consulta para um atendimento de precisão.',
};

import Header from '@/components/Header';

export default function PreConsultationPage() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 bg-light py-5">
                <PreConsultationForm />
            </main>
        </div>
    );
}
