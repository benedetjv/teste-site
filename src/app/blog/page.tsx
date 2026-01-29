'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import BodySelectorBlog from "@/components/BodySelectorBlog";

const posts = [
    // --- NOVEMBRO 2025 ---
    {
        slug: "dor-na-coluna-quando-preocupar",
        title: "Sinais de Alerta na Coluna: Quando a dor é preocupante?",
        excerpt: "Conheça os 'Red Flags' que indicam quando você deve procurar um especialista imediatamente.",
        date: "01 Nov 2025",
        category: "Coluna Vertebral",
        image: "/img/blog/red-flags-spine.png",
        relatedRegions: ['neck-front', 'thoracic-back', 'lumbar-back', 'cervical-back', 'chest']
    },
    {
        slug: "bloqueio-dor-coluna-quanto-tempo",
        title: 'Paciente pergunta: "Quanto tempo dura um bloqueio na coluna?"',
        excerpt: "Entenda a diferença entre o efeito diagnóstico imediato e o alívio prolongado do tratamento.",
        date: "03 Nov 2025",
        category: "Tratamentos Intervencionistas",
        image: "/img/blog/spinal-block-procedure.png",
        relatedRegions: ['lumbar-back', 'sciatica-left', 'sciatica-right', 'cervical-back']
    },
    {
        slug: "dor-ciatica-alivio-rapido",
        title: 'Paciente pergunta: "Como aliviar a dor ciática rápido?"',
        excerpt: "Dicas práticas e posições de alívio para lidar com uma crise aguda em casa.",
        date: "05 Nov 2025",
        category: "Nervo Ciático",
        image: "/img/blog/sciatica-relief.png",
        relatedRegions: ['sciatica-left', 'sciatica-right', 'lumbar-back', 'glute-left', 'glute-right']
    },
    {
        slug: "radiofrequencia-lombar-recuperacao",
        title: "Rizotomia por Radiofrequência: O guia da recuperação",
        excerpt: "Saiba por que este procedimento percutâneo permite um retorno tão rápido à rotina.",
        date: "07 Nov 2025",
        category: "Tratamentos Intervencionistas",
        image: "/img/blog/radiofrequency-spine.png",
        relatedRegions: ['lumbar-back', 'thoracic-back', 'cervical-back']
    },
    {
        slug: "como-funciona-radiofrequencia-termica",
        title: "Como Funciona a Radiofrequência Térmica para Dor na Coluna?",
        excerpt: "Um guia interativo para entender como as ondas de rádio desligam a dor sem cirurgia.",
        date: "10 Nov 2025",
        category: "Tratamentos Intervencionistas",
        image: "/img/blog/radiofrequency-machine.png",
        relatedRegions: ['lumbar-back', 'cervical-back', 'thoracic-back']
    },
    {
        slug: "infiltracao-joelho-doi",
        title: 'Paciente pergunta: "Infiltração no joelho dói?"',
        excerpt: "A verdade sobre o desconforto e como a tecnologia torna o procedimento quase indolor.",
        date: "12 Nov 2025",
        category: "Joelho e Quadril",
        image: "/img/blog/knee-injection.png",
        relatedRegions: ['knee-left', 'knee-right']
    },
    {
        slug: "viscossuplementacao-vale-a-pena",
        title: "Viscossuplementação para Artrose: Evidências e Benefícios",
        excerpt: "Análise técnica sobre o uso de ácido hialurônico para lubrificação e proteção articular.",
        date: "14 Nov 2025",
        category: "Joelho e Quadril",
        image: "/img/blog/viscosupplementation.png",
        relatedRegions: ['knee-left', 'knee-right', 'hip-left', 'hip-right']
    },
    {
        slug: "hernia-disco-x-protusao",
        title: "Diferenças entre Hérnia de Disco e Protusão Discal",
        excerpt: "Entenda os termos do seu laudo de ressonância e o que eles significam para sua saúde.",
        date: "16 Nov 2025",
        category: "Coluna Vertebral",
        image: "/img/blog/hernia-vs-protrusion.png",
        relatedRegions: ['lumbar-back', 'cervical-back', 'thoracic-back']
    },
    {
        slug: "quanto-custa-infiltracao-coluna",
        title: "Investimento em Qualidade de Vida: O valor de tratar a dor",
        excerpt: "Por que investir em tratamentos modernos pode ser mais econômico do que a dor crônica.",
        date: "19 Nov 2025",
        category: "Saúde e Bem-estar",
        image: "/img/blog/treatment-cost.png",
        relatedRegions: ['lumbar-back', 'cervical-back', 'knee-left', 'knee-right']
    },
    {
        slug: "cirurgia-coluna-minimamente-invasiva-riscos",
        title: "Segurança na Cirurgia de Coluna Minimamente Invasiva",
        excerpt: "Como a tecnologia e as técnicas modernas reduziram drasticamente os riscos cirúrgicos.",
        date: "21 Nov 2025",
        category: "Cirurgia de Coluna",
        image: "/img/blog/spine-surgery-safety.png",
        relatedRegions: ['lumbar-back', 'cervical-back']
    },
    {
        slug: "quando-procurar-especialista-dor",
        title: "Medicina Intervencionista: Quando procurar um Ortopedista com foco em Dor?",
        excerpt: "Saiba quando é hora de ir além do tratamento ortopédico convencional.",
        date: "23 Nov 2025",
        category: "Especialidades",
        image: "/img/blog/lumbar-radiculopathy.png",
        relatedRegions: ['head-front', 'neck-front', 'lumbar-back', 'sciatica-left', 'sciatica-right']
    },
    {
        slug: "dor-costas-cronica-faq",
        title: "Guia Completo: 10 Perguntas Frequentes sobre Dor nas Costas",
        excerpt: "Respostas diretas sobre academia, colchão, quiropraxia e tratamentos para a coluna.",
        date: "25 Nov 2025",
        category: "Guia do Paciente",
        image: "/img/blog/back-pain-faq.png",
        relatedRegions: ['lumbar-back', 'thoracic-back', 'cervical-back', 'abdomen']
    },
    {
        slug: "piriforme-vs-hernia",
        title: "Síndrome do Piriforme vs. Hérnia de Disco: Qual a causa?",
        excerpt: "Entenda a diferença entre a dor causada pelo músculo na nádega e o problema na coluna.",
        date: "28 Nov 2025",
        category: "Nervo Ciático",
        image: "/img/blog/piriformis.jpg?v=2",
        relatedRegions: ['glute-left', 'glute-right', 'lumbar-back', 'sciatica-left', 'sciatica-right']
    },
    {
        slug: "hernia-l4-l5-s1",
        title: "Hérnia L4-L5 e L5-S1: Entenda o seu laudo de ressonância",
        excerpt: "Por que estes níveis são os 'vilões' da maioria das dores lombares? Saiba o que significa.",
        date: "30 Nov 2025",
        category: "Coluna Vertebral",
        image: "/img/blog/l4-l5-s1-hernia.png",
        relatedRegions: ['lumbar-back', 'sciatica-left', 'sciatica-right']
    },

    // --- DEZEMBRO 2025 ---
    {
        slug: "dor-cervical-e-enxaqueca",
        title: "Dor Cervical e Enxaqueca: Quando o pescoço é o culpado?",
        excerpt: "Entenda como problemas na coluna cervical podem disparar dores de cabeça intensas.",
        date: "02 Dez 2025",
        category: "Coluna Vertebral",
        image: "/img/blog/neck-pain.png",
        relatedRegions: ['head-front', 'occipital-back', 'cervical-back', 'neck-front']
    },
    {
        slug: "estenose-canal-lombar",
        title: "Estenose de Canal Lombar: Por que sinto as pernas pesadas?",
        excerpt: "Saiba por que o cansaço nas pernas ao caminhar pode ter origem em um estreitamento na coluna.",
        date: "04 Dez 2025",
        category: "Coluna Vertebral",
        image: "/img/blog/spinal-stenosis.jpg?v=2",
        relatedRegions: ['lumbar-back', 'calf-left', 'calf-right', 'sciatica-left', 'sciatica-right']
    },
    {
        slug: "sedacao-em-procedimentos",
        title: 'Paciente pergunta: "Vou sentir dor durante o procedimento?"',
        excerpt: "Entenda como a sedação moderna garante conforto e segurança total em bloqueios e radiofrequência.",
        date: "06 Dez 2025",
        category: "Segurança do Paciente",
        image: "/img/blog/sedation-procedure.png",
        relatedRegions: ['lumbar-back', 'cervical-back', 'knee-left', 'hip-left']
    },
    {
        slug: "protese-vs-viscossuplementacao",
        title: "Prótese de Joelho vs. Viscossuplementação: Qual a melhor opção?",
        excerpt: "Descubra se ainda é possível evitar a cirurgia definitiva através da lubrificação articular moderna.",
        date: "09 Dez 2025",
        category: "Joelho e Quadril",
        image: "/img/blog/knee-prosthesis.jpg?v=2",
        relatedRegions: ['knee-left', 'knee-right']
    },
    {
        slug: "fibromialgia-vs-miofascial",
        title: "Fibromialgia ou Dor Miofascial? Entenda seu diagnóstico.",
        excerpt: "Muitos pacientes confundem os dois quadros. Saiba como identificar os pontos gatilho.",
        date: "11 Dez 2025",
        category: "Dúvidas Frequentes",
        image: "/img/blog/fibromyalgia-back.jpg?v=2",
        relatedRegions: ['neck-front', 'thoracic-back', 'lumbar-back', 'glute-left', 'shoulder-left']
    },
    {
        slug: "perigos-anti-inflamatorios",
        title: "Uso de Anti-inflamatórios: Você conhece os riscos do uso crônico?",
        excerpt: "O perigo invisível para os rins e estômago e como a medicina intervencionista pode ajudar.",
        date: "13 Dez 2025",
        category: "Saúde e Bem-estar",
        image: "/img/blog/medication.png",
        relatedRegions: ['lumbar-back', 'cervical-back', 'knee-left', 'head-front', 'abdomen']
    },
    {
        slug: "endoscopia-biportal",
        title: "Endoscopia Biportal (UBE): A Revolução da Precisão Cirúrgica",
        excerpt: "A tecnologia de última geração que permite realizar cirurgias de vídeo com mínima agressão muscular.",
        date: "15 Dez 2025",
        category: "Tecnologia",
        image: "/img/blog/biportal-endoscopy.png",
        relatedRegions: ['lumbar-back', 'sciatica-left', 'sciatica-right']
    },
    {
        slug: "ergonomia-home-office",
        title: "Ergonomia no Home Office: Proteja sua coluna trabalhando em casa",
        excerpt: "Dicas práticas para configurar seu ambiente e evitar que o trabalho destrua sua saúde.",
        date: "18 Dez 2025",
        category: "Prevenção",
        image: "/img/blog/ergonomic-chair-lumbar.png",
        relatedRegions: ['wrist-left', 'wrist-right', 'neck-front', 'lumbar-back', 'hand-left', 'hand-right']
    },
    {
        slug: "bico-de-papagaio-causas-tratamento",
        title: "Bico de Papagaio: O que é e como tratar a Osteofitose",
        excerpt: "Entenda por que essas expansões ósseas aparecem na coluna e como aliviar a dor sem cirurgia.",
        date: "20 Dez 2025",
        category: "Coluna Vertebral",
        image: "/img/blog/osteophyte.jpg?v=2",
        relatedRegions: ['lumbar-back', 'cervical-back', 'thoracic-back']
    },
    {
        slug: "bursite-quadril-tratamento",
        title: "Bursite de Quadril: Dor lateral e soluções modernas",
        excerpt: "Sente dor ao deitar de lado? Veja como as infiltrações de precisão resolvem a inflamação da bursa.",
        date: "22 Dez 2025",
        category: "Joelho e Quadril",
        image: "/img/blog/hip-pain.png",
        relatedRegions: ['hip-left', 'hip-right', 'glute-left', 'glute-right']
    },
    {
        slug: "fascite-plantar-dor-calcanhar",
        title: "Fascite Plantar: Por que o primeiro passo do dia dói tanto?",
        excerpt: "Entenda a inflamação da sola do pé e conheça os tratamentos para recuperar sua caminhada.",
        date: "26 Dez 2025",
        category: "Pé e Tornozelo",
        image: "/img/blog/foot-pain.png",
        relatedRegions: ['foot-left', 'foot-right']
    },
    {
        slug: "tunel-do-carpo-tratamento",
        title: "Mão Formigando? Pode ser Síndrome do Túnel do Carpo",
        excerpt: "Saiba como a hidrodissecção do nervo mediano pode evitar a necessidade de cirurgia aberta.",
        date: "28 Dez 2025",
        category: "Mão e Punho",
        image: "/img/blog/hand-elbow-pain.png",
        relatedRegions: ['hand-left', 'hand-right', 'wrist-left', 'wrist-right']
    },
    {
        slug: "epicondilite-lateral-tratamento",
        title: "Epicondilite Lateral: O guia do Cotovelo de Tenista",
        excerpt: "Dor ao pegar peso ou digitar? Conheça as ondas de choque e infiltrações regenerativas.",
        date: "30 Dez 2025",
        category: "Ombro e Cotovelo",
        image: "/img/blog/tennis-elbow.png",
        relatedRegions: ['elbow-left', 'elbow-right']
    },

    // --- JANEIRO 2026 ---
    {
        slug: "tendinite-manguito-rotador",
        title: "Dor no Ombro: Entenda a Lesão do Manguito Rotador",
        excerpt: "Dificuldade para levantar o braço ou dormir? Saiba como a medicina da dor acelera a recuperação.",
        date: "02 Jan 2026",
        category: "Ombro e Cotovelo",
        image: "/img/blog/shoulder-pain.png",
        relatedRegions: ['shoulder-left', 'shoulder-right']
    },
    {
        slug: "sacroileite-dor-gluteo",
        title: "Sacroileíte: A 'falsa hérnia' que causa dor no glúteo",
        excerpt: "Sente dor ao levantar da cadeira ou subir escadas? Pode ser inflamação na junta sacroilíaca.",
        date: "04 Jan 2026",
        category: "Coluna Vertebral",
        image: "/img/blog/sacroiliac.jpg?v=2",
        relatedRegions: ['glute-left', 'glute-right', 'lumbar-back']
    },
    {
        slug: "hernia-disco-cervical-tratamento",
        title: "Hérnia de Disco Cervical: Choque e Formigamento no Braço",
        excerpt: "Entenda por que a dor no pescoço irradia para a mão e como tratar sem cirurgia aberta.",
        date: "06 Jan 2026",
        category: "Coluna Vertebral",
        image: "/img/blog/cervical-hernia.png",
        relatedRegions: ['cervical-back', 'neck-front', 'shoulder-left', 'shoulder-right', 'hand-left']
    },
    {
        slug: "impacto-femoroacetabular-quadril",
        title: "Impacto Femoroacetabular (IFA): Dor na virilha do atleta",
        excerpt: "O atrito no quadril pode destruir sua cartilagem. Saiba como preservar a articulação.",
        date: "09 Jan 2026",
        category: "Joelho e Quadril",
        image: "/img/blog/femoroacetabular-impingement.png",
        relatedRegions: ['hip-left', 'hip-right', 'groin']
    },
    {
        slug: "neuroma-de-morton-dor-pe",
        title: "Neuroma de Morton: A sensação de 'pedra no sapato'",
        excerpt: "Choques e queimação na frente do pé? Saiba como a hidrodissecção alivia o nervo.",
        date: "11 Jan 2026",
        category: "Pé e Tornozelo",
        image: "/img/blog/mortons-neuroma.png",
        relatedRegions: ['foot-left', 'foot-right']
    },
    {
        slug: "dor-apos-cirurgia-coluna",
        title: "Operei a coluna e a dor voltou: O que fazer agora?",
        excerpt: "Entenda a Síndrome da Falha Cirúrgica e as opções de medicina intervencionista pós-artrodese.",
        date: "13 Jan 2026",
        category: "Coluna Vertebral",
        image: "/img/blog/post-surgery-spine.jpg?v=2",
        relatedRegions: ['lumbar-back', 'cervical-back']
    },
    {
        slug: "canelite-dor-canela-corrida",
        title: "Canelite: Como tratar a dor na canela ao correr",
        excerpt: "Sente dor na frente da canela durante ou após a corrida? Entenda a canelite e como evitar fraturas de estresse.",
        date: "15 Jan 2026",
        category: "Medicina do Esporte",
        image: "/img/blog/running-pain.png",
        relatedRegions: ['calf-left', 'calf-right', 'ankle-left', 'ankle-right']
    },
    {
        slug: "dor-cotovelo-ombro-beach-tennis",
        title: "Beach Tennis: Por que meu cotovelo e ombro doem?",
        excerpt: "A diversão na areia não pode virar lesão. Saiba como tratar o 'Beach Tennis Elbow' e dores no ombro.",
        date: "18 Jan 2026",
        category: "Medicina do Esporte",
        image: "/img/blog/beach-tennis-injury.png",
        relatedRegions: ['elbow-left', 'elbow-right', 'shoulder-left', 'shoulder-right', 'wrist-left']
    },
    {
        slug: "dor-apos-treino-lesao-ou-normal",
        title: "Dor após o Treino: Quando é normal e quando é lesão?",
        excerpt: "Aprenda a diferenciar a dor muscular tardia de um dano estrutural em tendões ou articulações.",
        date: "20 Jan 2026",
        category: "Medicina do Esporte",
        image: "/img/blog/gym-pain.jpg",
        relatedRegions: ['lumbar-back', 'knee-left', 'shoulder-right', 'hip-left']
    },
    {
        slug: "tendinite-aquiles-dor-calcanhar",
        title: "Tendinite de Aquiles: Dor no calcanhar que trava o corredor",
        excerpt: "Sentindo o tendão de Aquiles grosso ou dolorido? Saiba como a medicina de precisão acelera a cura.",
        date: "22 Jan 2026",
        category: "Medicina do Esporte",
        image: "/img/blog/achilles-tendonitis.png",
        relatedRegions: ['ankle-left', 'ankle-right', 'foot-left', 'foot-right']
    },
    {
        slug: "pubalgia-dor-virilha-esporte",
        title: "Pubalgia: A dor na virilha de quem joga futebol e faz CrossFit",
        excerpt: "Entenda o desequilíbrio muscular que causa dor profunda na região pubiana e como tratar.",
        date: "24 Jan 2026",
        category: "Medicina do Esporte",
        image: "/img/blog/pubalgia-groin-pain.png",
        relatedRegions: ['groin', 'hip-left', 'hip-right', 'abdomen']
    },
    {
        slug: "espondilodiscoartrose-lombar-laudo",
        title: "Espondilodiscoartrose Lombar: Entenda o laudo da sua Ressonância",
        excerpt: "O nome assusta, mas é um processo comum de desgaste. Saiba como tratar a dor associada a esse laudo.",
        date: "26 Jan 2026",
        category: "Coluna Vertebral",
        image: "/img/blog/spine-arthrosis.jpg?v=2",
        relatedRegions: ['lumbar-back', 'thoracic-back', 'cervical-back']
    },
    {
        slug: "miosan-relaxante-muscular-dor-coluna",
        title: "Miosan e Relaxantes Musculares: Por que eles não curam a dor?",
        excerpt: "Entenda por que o alívio dos remédios muitas vezes mascara o problema real da sua coluna.",
        date: "27 Jan 2026",
        category: "Saúde e Bem-estar",
        image: "/img/blog/muscle-relaxant-pills.png",
        relatedRegions: ['lumbar-back', 'cervical-back', 'abdomen']
    },
    {
        slug: "cadeira-ergonomica-apoio-lombar",
        title: "CADEIRA ERGONÔMICA: Como configurar o apoio lombar corretamente",
        excerpt: "Dicas práticas para proteger sua coluna no home office e evitar o desgaste ao sentar.",
        date: "28 Jan 2026",
        category: "Prevenção",
        image: "/img/blog/ergonomic-chair-lumbar.png",
        relatedRegions: ['lumbar-back', 'neck-front', 'wrist-left', 'wrist-right']
    },
    {
        slug: "cid-lombar-codigos-dor-coluna",
        title: "CID Lombar: O que significam os códigos M54.5, M51.1 e outros?",
        excerpt: "Decifre o código de diagnóstico no seu atestado médico e entenda o que ele diz sobre sua coluna.",
        date: "28 Jan 2026",
        category: "Guia do Paciente",
        image: "/img/blog/medical-report.jpg?v=2",
        relatedRegions: ['lumbar-back', 'cervical-back', 'sciatica-left', 'sciatica-right']
    },
    {
        slug: "dor-lombar-irradia-pernas",
        title: "Dor na lombar que irradia para as pernas: O que pode ser?",
        excerpt: "Nem toda dor que desce para a perna é hérnia de disco. Conheça as 3 causas principais.",
        date: "29 Jan 2026",
        category: "Coluna Vertebral",
        image: "/img/blog/lumbar-radiculopathy.png",
        relatedRegions: ['lumbar-back', 'sciatica-left', 'sciatica-right', 'glute-left']
    },
    {
        slug: "dor-lombar-remada-baixa-musculacao",
        title: "Remada Baixa e Musculação: Por que minha lombar dói no treino?",
        excerpt: "Saiba como proteger sua coluna ao malhar e entenda quando a dor indica uma lesão real.",
        date: "29 Jan 2026",
        category: "Medicina do Esporte",
        image: "/img/blog/rowing-pain.jpg?v=2",
        relatedRegions: ['lumbar-back', 'sciatica-left', 'sciatica-right']
    },

    // --- NOVOS POSTS AGENDADOS (FEVEREIRO E MARÇO 2026) ---
    {
        slug: "condromalacia-patelar-joelho-estala",
        title: "Condromalácia Patelar: Por que meu joelho estala na escada?",
        excerpt: "Entenda o 'amolecimento' da cartilagem da patela, exercícios proibidos e tratamentos que funcionam.",
        date: "02 Fev 2026",
        category: "Joelho e Quadril",
        image: "/img/blog/knee-pain.png",
        relatedRegions: ['knee-left', 'knee-right']
    },
    {
        slug: "cisto-baker-joelho",
        title: "Cisto de Baker: O caroço atrás do joelho é perigoso?",
        excerpt: "Se você sente um inchaço atrás do joelho, saiba que ele geralmente é apenas o mensageiro de outro problema.",
        date: "05 Fev 2026",
        category: "Joelho e Quadril",
        image: "/img/blog/knee-pain.png",
        relatedRegions: ['knee-left', 'knee-right']
    },
    {
        slug: "colageno-tipo-2-funciona",
        title: "Colágeno Tipo 2 e Suplementos: Verdade ou Dinheiro jogado fora?",
        excerpt: "Análise baseada em evidências: O que a ciência realmente diz sobre suplementar para cartilagem.",
        date: "08 Fev 2026",
        category: "Saúde e Bem-estar",
        image: "/img/blog/medication.png",
        relatedRegions: ['knee-left', 'knee-right', 'hip-left', 'hip-right']
    },
    {
        slug: "ombro-congelado-capsulite-adesiva",
        title: "Ombro Congelado: Quando a dor noturna trava seu braço",
        excerpt: "Entenda as fases da Capsulite Adesiva e como a hidrodistensão pode 'descolar' seu ombro rapidamente.",
        date: "11 Fev 2026",
        category: "Ombro e Cotovelo",
        image: "/img/blog/shoulder-pain.png",
        relatedRegions: ['shoulder-left', 'shoulder-right']
    },
    {
        slug: "tendinite-calcaria-ombro",
        title: "Tendinite Calcária: O 'cálcio' no ombro que causa dor aguda",
        excerpt: "Saiba como a Terapia por Ondas de Choque pode dissolver as calcificações sem necessidade de cirurgia.",
        date: "14 Fev 2026",
        category: "Ombro e Cotovelo",
        image: "/img/blog/shoulder-pain.png",
        relatedRegions: ['shoulder-left', 'shoulder-right']
    },
    {
        slug: "tenosinovite-de-quervain",
        title: "Dor no Polegar: Conheça a Tenosinovite de De Quervain",
        excerpt: "A 'tendinite do celular' ou das mães de recém-nascidos. Saiba como testar e tratar a dor no punho.",
        date: "17 Fev 2026",
        category: "Mão e Punho",
        image: "/img/blog/hand-elbow-pain.png",
        relatedRegions: ['wrist-left', 'wrist-right', 'hand-left', 'hand-right']
    },
    {
        slug: "text-neck-dor-pescoco-celular",
        title: "Text Neck: A epidemia de dor cervical causada pelo celular",
        excerpt: "Olhar para baixo multiplica o peso da cabeça. Descubra exercícios para reverter o dano postural.",
        date: "20 Fev 2026",
        category: "Coluna Vertebral",
        image: "/img/blog/neck-pain.png",
        relatedRegions: ['neck-front', 'cervical-back', 'occipital-back']
    },
    {
        slug: "melhor-posicao-dormir-coluna",
        title: "Qual a melhor posição para dormir se tenho dor nas costas?",
        excerpt: "De lado, de barriga para cima ou bruços? Ajustes simples de travesseiro que mudam sua noite.",
        date: "23 Fev 2026",
        category: "Guia do Paciente",
        image: "/img/blog/ergonomic-chair-lumbar.png",
        relatedRegions: ['lumbar-back', 'cervical-back']
    },
    {
        slug: "escoliose-em-adultos-dor",
        title: "Tenho Escoliose diagnosticada adulto: Preciso me preocupar?",
        excerpt: "Mitos e verdades sobre a curvatura da coluna na vida adulta e quando ela realmente causa dor.",
        date: "26 Fev 2026",
        category: "Coluna Vertebral",
        image: "/img/blog/red-flags-spine.png",
        relatedRegions: ['thoracic-back', 'lumbar-back']
    },
    {
        slug: "dor-no-coccix-coccigodinia",
        title: "Dor no Cóccix ao sentar: Causas e alívio para Coccigodinia",
        excerpt: "Quedas antigas ou má postura? Entenda por que o 'osso final da coluna' inflama e como tratar.",
        date: "01 Mar 2026",
        category: "Coluna Vertebral",
        image: "/img/blog/sacroiliac.jpg?v=2",
        relatedRegions: ['glute-left', 'glute-right', 'lumbar-back']
    }
];

// Função auxiliar para converter string de data PT-BR (DD MMM YYYY) para objeto Date
function parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split(' ');
    // Meses em português para índice zero-based
    const months: { [key: string]: number } = {
        'Jan': 0, 'Jan.': 0, 'Janeiro': 0,
        'Fev': 1, 'Fev.': 1, 'Fevereiro': 1,
        'Mar': 2, 'Mar.': 2, 'Março': 2,
        'Abr': 3, 'Abr.': 3, 'Abril': 3,
        'Mai': 4, 'Mai.': 4, 'Maio': 4,
        'Jun': 5, 'Jun.': 5, 'Junho': 5,
        'Jul': 6, 'Jul.': 6, 'Julho': 6,
        'Ago': 7, 'Ago.': 7, 'Agosto': 7,
        'Set': 8, 'Set.': 8, 'Setembro': 8,
        'Out': 9, 'Out.': 9, 'Outubro': 9,
        'Nov': 10, 'Nov.': 10, 'Novembro': 10,
        'Dez': 11, 'Dez.': 11, 'Dezembro': 11
    };

    // Fallback simples se algo der errado
    if (months[month] === undefined) return new Date();

    return new Date(parseInt(year), months[month], parseInt(day));
}

export default function BlogIndex() {
    const [filterRegions, setFilterRegions] = useState<string[]>([]);
    // Estado para controlar posts visíveis baseado na data
    const [visiblePosts, setVisiblePosts] = useState(posts);

    useEffect(() => {
        // Filtra posts agendados que ainda não devem aparecer
        const now = new Date();
        // Zera as horas para comparar apenas datas
        now.setHours(23, 59, 59, 999);

        const releasedPosts = posts.filter(post => {
            const postDate = parseDate(post.date);
            return postDate <= now;
        });

        setVisiblePosts(releasedPosts);
    }, []);

    const filteredPosts = filterRegions.length > 0
        ? visiblePosts.filter(post =>
            post.relatedRegions.some(region => filterRegions.includes(region))
        )
        : visiblePosts;

    return (
        <main className="bg-light min-vh-100 pb-5">
            {/* Hero Section */}
            <section className="bg-white py-5 border-bottom">
                <div className="container py-4">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                                Portal de Medicina Intervencionista
                            </span>
                            <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Vida em Movimento: O Caminho para o Alívio de Precisão</h1>
                            <p className="lead text-secondary mb-0">Informação de última geração para quem busca recuperar a liberdade de movimento e a qualidade de vida.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Navigation / FILTER */}
            <section className="container mt-n4 mb-5 position-relative" style={{ zIndex: 10 }}>
                <BodySelectorBlog onFilterChange={setFilterRegions} />
            </section>

            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0" style={{ color: 'var(--azul-escuro)' }}>
                        {filterRegions.length > 0 ? `Artigos Sugeridos para suas Dores (${filteredPosts.length})` : 'Todos os Artigos Recentes'}
                    </h4>
                    {filterRegions.length > 0 && (
                        <button onClick={() => setFilterRegions([])} className="btn btn-sm btn-outline-secondary rounded-pill">Ver todos os artigos</button>
                    )}
                </div>

                <div className="row">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <div key={index} className="col-md-6 col-lg-4 mb-4 animate__animated animate__fadeIn">
                                <article className="card h-100 shadow-sm border-0 overflow-hidden hover-shadow transition">
                                    <div className="position-relative" style={{ height: '200px' }}>
                                        <img
                                            src={post.image || "/img/foto-otto.jpg"}
                                            className="card-img-top h-100 w-100 object-fit-cover"
                                            alt={post.title}
                                        />
                                        <div className="position-absolute top-0 end-0 p-3">
                                            <span className="badge bg-primary rounded-pill shadow-sm">{post.category}</span>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 d-flex flex-column">
                                        <h2 className="h5 card-title fw-bold mb-3">
                                            <Link href={`/blog/${post.slug}`} className="text-decoration-none text-dark stretched-link">
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <p className="card-text text-muted mb-4 flex-grow-1 small" style={{ lineHeight: '1.6' }}>{post.excerpt}</p>
                                        <div className="text-muted small border-top pt-3 d-flex justify-content-between align-items-center">
                                            <span><i className="bi bi-calendar3 me-2"></i>{post.date}</span>
                                            <span className="text-primary fw-bold">Ler mais <i className="bi bi-arrow-right"></i></span>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <div className="display-1 text-muted opacity-10 mb-3"><i className="bi bi-journal-x"></i></div>
                            <h5 className="text-muted">Nenhum artigo disponível para estas áreas no momento.</h5>
                            <button onClick={() => setFilterRegions([])} className="btn btn-primary mt-3 rounded-pill">Ver todos os artigos</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
