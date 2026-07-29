"use client";

import React from 'react';

export default function SchemaOrganization() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": "Dr. Otto Beckedorff",
        "image": "https://drotto.com.br/img/foto-otto.jpg",
        "description": "Médico Ortopedista especialista em Tratamento da Dor, Coluna e Articulações em Campinas (Clínica Adora / Hospital Vera Cruz) e Jacutinga. Atendimento a Hérnia de Disco, Dor na Coluna e procedimentos minimamente invasivos.",
        "medicalSpecialty": [
            "Orthopedic Surgery",
            "Pain Management",
            "Interventional Pain Medicine"
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
            "GAMA Saúde",
            "Omint"
        ],
        "knowsAbout": [
            "Ortopedista em Campinas",
            "Dor na Coluna",
            "Hérnia de Disco Cervical e Lombar",
            "Dor Ciática",
            "Rizotomia por Radiofrequência",
            "Bloqueio de Coluna",
            "Viscossuplementação",
            "Ortopedista Convenio Amil Campinas"
        ],
        "medicalConditionTreated": [
            "Hérnia de Disco",
            "Lombalgia (Dor na Coluna)",
            "Cervicalgia",
            "Estenose de Canal Vertebral",
            "Artrose de Joelho e Quadril",
            "Dor Ciática"
        ],
        "availableService": [
            {
                "@type": "MedicalProcedure",
                "name": "Tratamento de Hérnia de Disco e Dor na Coluna",
                "description": "Procedimentos minimamente invasivos (bloqueios, rizotomia e neuromodulação) para alívio de dor na coluna sem cirurgia aberta."
            },
            {
                "@type": "MedicalProcedure",
                "name": "Bloqueio Foraminal e Infiltração de Coluna",
                "description": "Infiltração guiada por imagem para alívio imediato e diagnóstico de dor cervical e lombar."
            },
            {
                "@type": "MedicalProcedure",
                "name": "Rizotomia por Radiofrequência",
                "description": "Desativação térmica controlada dos nervos causadores de dor facetária na coluna."
            },
            {
                "@type": "MedicalProcedure",
                "name": "Viscossuplementação",
                "description": "Infiltração de Ácido Hialurônico para Artrose e desgaste articular."
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
