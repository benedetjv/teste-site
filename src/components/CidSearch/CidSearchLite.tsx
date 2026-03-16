"use client";

import React, { useState } from "react";
import { Search, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mini Banco de Dados Local Leve com CIDs de Ortopedia Frequentes
const cidDatabase: Record<string, { desc: string; text: string; link: string }> = {
  // --- COLUNA ---
  "M54": { desc: "Dorsalgia (Dor nas costas genérica)", text: "Indica dor na região das costas. Se dormente ou contínua, uma avaliação ortopédica pode prevenir agravamentos e hérnias.", link: "/blog" },
  "M54.4": { desc: "Lumbago com Ciática (Dor que desce pra perna)", text: "É uma inflamação forte na lombar que irradia pelo nervo ciático. Procedimentos como bloqueios articulares costumam ser muito eficazes.", link: "/#contact" },
  "M54.5": { desc: "Lombalgia (Dor na lombar baixa)", text: "O famoso 'travou as costas'. Frequentemente associado a desgaste facetário. Evite apenas analgésicos e busque foco na raiz da inflamação.", link: "/blog/dor-nas-costas-o-que-pode-ser" },
  "M51": { desc: "Transtorno de Discos Intervertebrais", text: "Suspeita de problemas com os 'amortecedores' da coluna, como hérnia ou abaulamento. Nem todo caso é cirúrgico; a maioria é resolvida com tratamento conservador.", link: "/#contact" },
  "M54.2": { desc: "Cervicalgia (Dor no Pescoço)", text: "Dor comumente causada por postura prolongada ou tensão inflamatória das vértebras cervicais superiores.", link: "/#contact" },
  // --- JOELHO & QUADRIL ---
  "M17": { desc: "Gonartrose (Artrose do Joelho)", text: "O diagnóstico indica desgaste na cartilagem. Opções modernas como a Viscossuplementação podem estabilizar a perda e melhorar o conforto sem cirurgia.", link: "/#servicos" },
  "M22": { desc: "Transtornos da Rótula (Ex: Condromalácia)", text: "Geralmente indica atrito patelar no joelho. Necessita avaliar fraqueza muscular associada para evitar progressão dolorosa.", link: "/blog/dor-no-joelho-cid-significado" },
  "M23": { desc: "Transtornos Internos dos Joelhos", text: "Costuma englobar meniscos e pequenos ligamentos. Muito comum após esportes e pode responder muito bem a tratamentos guiados por imagem.", link: "/blog/dor-no-joelho-cid-significado" },
  "M16": { desc: "Coxartrose (Artrose no Quadril)", text: "Desgaste da articulação bacia-fêmur. Tratamentos médicos regenerativos focam na sobrevida dessa junta e alívio de dor na virilha.", link: "/#servicos" },
  // --- OMBRO & GERAIS ---
  "M75.1": { desc: "Síndrome do Manguito Rotador", text: "Indica tendinite severa ou lesões nos tendões que movem o ombro. Pode gerar muita dor noturna.", link: "/#contact" },
  "M25.5": { desc: "Dor Articular (Qualquer Articulação)", text: "CID genérico de urgência. Precisamos de uma avaliação em consultório para descobrir qual região (osso, cápsula ou tendão) está doendo e tratar com foco.", link: "/#contact" },
  "M79.1": { desc: "Mialgia (Dor Muscular)", text: "CID atribuído a dores ou nódulos nos músculos (Pontos Gatilho). Táticas como o Agulhamento Seco podem trazer relaxamento profundo local.", link: "/#contact" }
};

export default function CidSearchLite() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<{ id: string; desc: string; text: string; link: string } | null | "NOT_FOUND">(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setResult(null);
      return;
    }

    const clearSearch = searchTerm.toUpperCase().trim().replace(",", ".");
    
    // Procura exata
    if (cidDatabase[clearSearch]) {
      setResult({ id: clearSearch, ...cidDatabase[clearSearch] });
      return;
    }

    // Busca por "StartsWith" para englobar subtipos (ex: procura 'M54.5' encontra 'M54' se só ele existir, ou vice versa na busca simplista)
    const partialMatch = Object.keys(cidDatabase).find(key => clearSearch.startsWith(key) || key.startsWith(clearSearch.substring(0,3)));
    
    if (partialMatch) {
       setResult({ id: partialMatch, ...cidDatabase[partialMatch] });
    } else {
       setResult("NOT_FOUND");
    }
  };

  return (
    <div className="bg-light py-5 rounded-4 px-4 my-5 border" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
      <div className="text-center mb-4">
        <h3 className="fw-bold mb-2">Qual CID está no seu atestado?</h3>
        <p className="text-muted mb-0">Digite o código (Ex: M54.5) e entenda o que ele significa para a sua dor.</p>
      </div>

      <form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
        <div className="position-relative" style={{ maxWidth: '400px', width: '100%' }}>
          <input 
            type="text" 
            className="form-control form-control-lg rounded-pill ps-4" 
            placeholder="Digite o CID (ex: M54.5, M17...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingRight: '100px' }}
          />
          <button 
            type="submit" 
            className="btn btn-primary position-absolute top-50 end-0 translate-middle-y rounded-pill me-1 d-flex align-items-center justify-content-center"
            style={{ width: '80px', height: 'calc(100% - 8px)' }}
          >
            <Search size={18} />
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {result === "NOT_FOUND" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="alert alert-warning d-flex align-items-center justify-content-center mx-auto"
            style={{ maxWidth: '500px' }}
          >
            <AlertCircle size={20} className="me-2" />
            <span>Código não encontrado ou não faz parte do escopo ortopédico comum crônico.</span>
          </motion.div>
        )}

        {result && result !== "NOT_FOUND" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white p-4 rounded-4 shadow-sm mx-auto border"
            style={{ maxWidth: '600px' }}
          >
            <div className="d-flex align-items-center mb-3">
              <span className="badge bg-primary px-3 py-2 rounded-pill fs-6 me-3">CID {result.id}</span>
              <h4 className="fw-bold mb-0 text-dark fs-5">{result.desc}</h4>
            </div>
            
            <p className="text-muted mb-4 lh-lg">
              {result.text}
            </p>

            <a href={result.link} className="btn btn-outline-primary rounded-pill px-4 py-2 d-inline-flex align-items-center">
              Como tratar na origem <ArrowRight size={16} className="ms-2" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
