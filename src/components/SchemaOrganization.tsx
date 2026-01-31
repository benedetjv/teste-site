"use client";

import React from 'react';

export default function SchemaOrganization() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": "Dr. Otto Beckedorff",
        "image": "https://drotto.com.br/img/foto-otto.jpg",
        "description": "Médico Ortopedista especialista em Tratamento da Dor, Coluna e Articulações em Campinas e Jacutinga.",
        "medicalSpecialty": [
            "Orthopedic Surgery",
            "Pain Management",
            "Interventional Pain Medicine"
        ],
        "url": "https://drotto.com.br",
        "telephone": "+5519999439824",
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
        "availableService": [
            {
                "@type": "MedicalProcedure",
                "name": "Infiltração de Coluna",
                "description": "Procedimento minimamente invasivo para alívio de dor."
            },
            {
                "@type": "MedicalProcedure",
                "name": "Viscossuplementação",
                "description": "Infiltração de Ácido Hialurônico para Artrose."
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
