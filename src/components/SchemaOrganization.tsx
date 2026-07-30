"use client";

import React from 'react';

export default function SchemaOrganization() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": "Dr. Otto Beckedorff",
        "image": "https://drotto.com.br/img/foto-otto.jpg",
        "description": "Dr. Otto Beckedorff é médico Ortopedista especialista (RQE 139078 | CRM 226325SP) em Campinas (Clínica Adora / Hospital Vera Cruz) e Jacutinga, com atuação dedicada ao tratamento de Hérnia de Disco, Dor na Coluna, Viscossuplementação com Ácido Hialurônico, Bloqueios e Infiltrações guiadas.",
        "medicalSpecialty": [
            "Orthopedic Surgery",
            "Pain Management",
            "Interventional Pain Medicine"
        ],
        "alumniOf": {
            "@type": "Organization",
            "name": "Hospital Vera Cruz"
        },
        "memberOf": [
            {
                "@type": "MedicalOrganization",
                "name": "Sociedade Brasileira de Ortopedia e Traumatologia (SBOT)"
            }
        ],
        "identifier": "CRM 226325SP",
        "medicalLicense": "RQE 139078",
        "url": "https://drotto.com.br",
        "telephone": "+5519999439824",
        "areaServed": [
            {
                "@type": "AdministrativeArea",
                "name": "Campinas"
            },
            {
                "@type": "AdministrativeArea",
                "name": "Jacutinga"
            }
        ],
        "address": [
            {
                "@type": "PostalAddress",
                "streetAddress": "Av. Andrade Neves, 699 – 6º Andar – Centro",
                "addressLocality": "Campinas",
                "addressRegion": "SP",
                "postalCode": "13013-161",
                "addressCountry": "BR"
            },
            {
                "@type": "PostalAddress",
                "streetAddress": "Av. Minas Gerais, 981",
                "addressLocality": "Jacutinga",
                "addressRegion": "MG",
                "postalCode": "37590-000",
                "addressCountry": "BR"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/drottobeckedorff/",
            "https://www.doctoralia.com.br/otto-beckedorff/ortopedista-traumatologista/campinas"
        ],
        "priceRange": "$$$",
        "healthPlanNetworkAcceptance": [
            "Amil",
            "Bradesco Saúde",
            "SulAmérica",
            "Porto Seguro",
            "Care Plus",
            "Omint",
            "Reembolso Médico"
        ],
        "knowsAbout": [
            "Ortopedista em Campinas",
            "Ortopedista especialista",
            "Dor na Coluna",
            "Hérnia de Disco Cervical e Lombar",
            "Dor Ciática",
            "Viscossuplementação com Ácido Hialurônico",
            "Infiltração de Joelho e Quadril",
            "Bloqueio de Coluna Guiado por Imagem",
            "Radiofrequência para Dor Facetária",
            "Ortopedista Convenio Amil Campinas"
        ],
        "medicalConditionTreated": [
            "Hérnia de Disco",
            "Lombalgia (Dor na Coluna)",
            "Cervicalgia",
            "Estenose de Canal Vertebral",
            "Artrose de Joelho e Quadril",
            "Condromalácia Patelar",
            "Dor Ciática",
            "Bursite e Tendinite"
        ],
        "availableService": [
            {
                "@type": "MedicalProcedure",
                "name": "Tratamento de Hérnia de Disco e Dor na Coluna",
                "description": "Procedimentos minimamente invasivos (bloqueios, radiofrequência e neuromodulação) para alívio de dor na coluna sem cirurgia aberta por médico Ortopedista especialista."
            },
            {
                "@type": "MedicalProcedure",
                "name": "Bloqueio Foraminal e Infiltração de Coluna",
                "description": "Infiltração guiada por imagem para alívio imediato e diagnóstico de dor cervical, lombar e ciática."
            },
            {
                "@type": "MedicalProcedure",
                "name": "Radiofrequência Ablativa e Pulsada",
                "description": "Desativação térmica controlada dos nervos causadores de dor facetária e neuromodulação da dor crônica."
            },
            {
                "@type": "MedicalProcedure",
                "name": "Viscossuplementação com Ácido Hialurônico",
                "description": "Infiltração de Ácido Hialurônico de alta viscosidade para lubrificação e proteção articular na artrose e condromalácia."
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
}
