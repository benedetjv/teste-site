import type { MDXComponents } from 'mdx/types'
import React from 'react'
import PainCalculator from './components/PainCalculator'
import RedFlagsChecklist from './components/RedFlagsChecklist'
import RecoveryTimeline from './components/RecoveryTimeline'
import TreatmentQuiz from './components/TreatmentQuiz'
import MedicationRiskCalculator from './components/MedicationRiskCalculator'
import BodySelector from './components/BodySelector'
import RadiofrequencySimulator from './components/RadiofrequencySimulator'


import AuthorBio from './components/AuthorBio'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <h1 className="display-4 fw-bold mt-5 mb-4" style={{ color: 'var(--azul-escuro)' }}>{children}</h1>,
        h2: ({ children }) => <h2 className="h2 fw-bold mt-5 mb-3 border-bottom pb-2" style={{ color: 'var(--azul-medio)' }}>{children}</h2>,
        h3: ({ children }) => <h3 className="h4 fw-bold mt-4 mb-3" style={{ color: 'var(--azul-escuro)' }}>{children}</h3>,
        p: ({ children }) => <p className="lead mb-4 text-secondary" style={{ lineHeight: '1.8' }}>{children}</p>,
        ul: ({ children }) => <ul className="list-unstyled ps-3 mb-4 border-start border-4 ps-4" style={{ borderColor: 'var(--azul-claro)' }}>{children}</ul>,
        li: ({ children }) => <li className="mb-2 d-flex align-items-start"><i className="bi bi-check-circle-fill me-2 fs-5 mt-1" style={{ color: 'var(--azul-medio)' }}></i><span>{children}</span></li>,
        a: ({ href, children }) => <a href={href} className="btn btn-lg mt-3 text-white fw-bold shadow-sm px-5 rounded-pill" style={{ backgroundColor: 'var(--azul-escuro)', border: 'none' }}>{children}</a>,
        strong: ({ children }) => <span className="fw-bolder" style={{ color: 'var(--azul-escuro)' }}>{children}</span>,

        // Custom Components for MDX
        QuestionBox: ({ children }: { children: React.ReactNode }) => (
            <div className="p-4 my-5 rounded-3 border-start border-5 shadow-sm" style={{ backgroundColor: '#f8fbfe', borderColor: 'var(--azul-medio)' }}>
                <p className="small text-uppercase fw-bold mb-2" style={{ color: 'var(--azul-claro)', letterSpacing: '1px' }}>Paciente Pergunta:</p>
                <h4 className="fst-italic mb-0" style={{ color: 'var(--azul-escuro)', lineHeight: '1.4' }}>"{children}"</h4>
            </div>
        ),
        PainCalculator,
        RedFlagsChecklist,
        RecoveryTimeline,
        TreatmentQuiz,
        MedicationRiskCalculator,
        BodySelector,
        RadiofrequencySimulator,

        wrapper: ({ children }) => (
            <article className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 bg-white p-4 p-md-5 rounded-3 shadow-sm border">
                        {children}
                        <AuthorBio />
                    </div>
                </div>
            </article>
        ),
        ...components,
    }
}

