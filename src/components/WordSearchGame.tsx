"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Configuração dos Níveis
const LEVELS = [
    {
        id: 1,
        title: "Nível 1: Onde Dói?",
        description: "Encontre as palavras relacionadas a sintomas comuns.",
        words: ["COSTAS", "DOR", "HERNIA", "TENSAO", "JOELHO"]
    },
    {
        id: 2,
        title: "Nível 2: O Tratamento",
        description: "Descubra como podemos resolver o problema.",
        words: ["BLOQUEIO", "MEDICO", "OTTO", "EXAME", "CUIDADO"]
    },
    {
        id: 3,
        title: "Nível 3: O Objetivo",
        description: "O que queremos alcançar juntos?",
        words: ["ALIVIO", "VIDA", "SAUDE", "PAZ", "SORRISO"]
    }
];

const GRID_SIZE = 10;

export default function WordSearchGame() {
    const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
    const [grid, setGrid] = useState<string[][]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [startCell, setStartCell] = useState<{ r: number, c: number } | null>(null);
    const [tempEndCell, setTempEndCell] = useState<{ r: number, c: number } | null>(null); // Visual feedback during drag/click
    const [successMsg, setSuccessMsg] = useState('');

    // Derived state
    const currentLevel = LEVELS[currentLevelIdx];
    const isLevelComplete = foundWords.length === currentLevel.words.length;
    const isGameComplete = isLevelComplete && currentLevelIdx === LEVELS.length - 1;

    // Inicializa o Grid ao mudar de nível
    useEffect(() => {
        startLoginFlow();
    }, [currentLevelIdx]);

    const startLoginFlow = () => {
        setFoundWords([]);
        setStartCell(null);
        setTempEndCell(null);
        generateGrid();
    }; const generateGrid = () => {
        // Cria grid vazio
        let newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));

        // Coloca as palavras do nível atual
        const currentWords = [...LEVELS[currentLevelIdx].words];

        // Tenta colocar todas as palavras
        let attempts = 0;
        let success = false;

        while (!success && attempts < 100) {
            // Reset grid for retry
            newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
            let allPlaced = true;

            for (const word of currentWords) {
                let placed = false;
                let wordAttempts = 0;
                while (!placed && wordAttempts < 50) {
                    const direction = Math.random() > 0.5 ? 'H' : 'V';
                    const row = Math.floor(Math.random() * GRID_SIZE);
                    const col = Math.floor(Math.random() * GRID_SIZE);

                    if (canPlaceWord(newGrid, word, row, col, direction)) {
                        placeWord(newGrid, word, row, col, direction);
                        placed = true;
                    }
                    wordAttempts++;
                }
                if (!placed) allPlaced = false;
            }
            if (allPlaced) success = true;
            attempts++;
        }

        // Preenche vazios com letras aleatórias
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (newGrid[r][c] === '') {
                    newGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
                }
            }
        }
        setGrid(newGrid);
    };

    const canPlaceWord = (g: string[][], word: string, r: number, c: number, dir: string) => {
        if (dir === 'H' && c + word.length > GRID_SIZE) return false;
        if (dir === 'V' && r + word.length > GRID_SIZE) return false;

        for (let i = 0; i < word.length; i++) {
            const cell = dir === 'H' ? g[r][c + i] : g[r + i][c];
            if (cell !== '' && cell !== word[i]) return false;
        }
        return true;
    };

    const placeWord = (g: string[][], word: string, r: number, c: number, dir: string) => {
        for (let i = 0; i < word.length; i++) {
            if (dir === 'H') g[r][c + i] = word[i];
            else g[r + i][c] = word[i];
        }
    };

    // Lógica de Seleção (Toque/Clique)
    const handleCellClick = (r: number, c: number) => {
        if (isLevelComplete) return;

        if (!startCell) {
            setStartCell({ r, c });
            setTempEndCell({ r, c });
        } else {
            // Tenta formar a palavra do Start até aqui
            checkSelection(startCell, { r, c });
            setStartCell(null);
            setTempEndCell(null);
        }
    };

    const checkSelection = (start: { r: number, c: number }, end: { r: number, c: number }) => {
        let word = "";

        // Verifica alinhamento
        if (start.r !== end.r && start.c !== end.c) {
            // Diagonal ou desalinhado - ignorar para simplificar mobile
            return;
        }

        // Horizontal
        if (start.r === end.r) {
            const minC = Math.min(start.c, end.c);
            const maxC = Math.max(start.c, end.c);
            for (let i = minC; i <= maxC; i++) word += grid[start.r][i];
        }
        // Vertical
        else if (start.c === end.c) {
            const minR = Math.min(start.r, end.r);
            const maxR = Math.max(start.r, end.r);
            for (let i = minR; i <= maxR; i++) word += grid[i][start.c];
        }

        const reversed = word.split('').reverse().join('');
        const targetWords = currentLevel.words;

        if (targetWords.includes(word) && !foundWords.includes(word)) {
            setFoundWords([...foundWords, word]);
            showSuccess(word);
        } else if (targetWords.includes(reversed) && !foundWords.includes(reversed)) {
            setFoundWords([...foundWords, reversed]);
            showSuccess(reversed);
        }
    };

    const showSuccess = (word: string) => {
        const msgs = ["Boa!", "Isso aí!", "Mais uma!", "Excelente", "Achou!"];
        setSuccessMsg(msgs[Math.floor(Math.random() * msgs.length)] + ` (${word})`);
        setTimeout(() => setSuccessMsg(''), 1500);
    }

    const nextLevel = () => {
        if (currentLevelIdx < LEVELS.length - 1) {
            setCurrentLevelIdx(currentLevelIdx + 1);
        }
    };

    const isSelected = (r: number, c: number) => {
        if (startCell && startCell.r === r && startCell.c === c) return true;
        return false;
    };

    return (
        <div className="text-center w-100" style={{ maxWidth: '500px', margin: '0 auto' }}>
            {/* Header do Nível */}
            <div className="mb-4 d-flex justify-content-between align-items-center bg-light p-3 rounded-4 shadow-sm">
                <div className="text-start">
                    <span className="badge bg-primary mb-1">Fase {currentLevelIdx + 1}/{LEVELS.length}</span>
                    <h5 className="fw-bold mb-0 text-dark small">{currentLevel.title}</h5>
                </div>
                <div className="text-end">
                    <span className="h4 fw-bold text-success">{foundWords.length}</span>
                    <span className="text-muted small">/{currentLevel.words.length}</span>
                </div>
            </div>

            {/* Mensagem Flutuante */}
            <AnimatePresence>
                {successMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="badge bg-success shadow position-absolute start-50 translate-middle-x mb-2"
                        style={{ zIndex: 20, top: '140px', fontSize: '14px' }}
                    >
                        {successMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* GRID */}
            <div className="d-inline-block p-2 bg-white rounded-4 shadow-sm border mb-4 position-relative">
                {/* Overlay de Nível Completo */}
                {isLevelComplete && !isGameComplete && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-90 d-flex flex-column align-items-center justify-content-center rounded-4"
                        style={{ zIndex: 50 }}
                    >
                        <h2 className="fw-bold text-success mb-3">Nível Concluído!</h2>
                        <button onClick={nextLevel} className="btn btn-primary btn-lg rounded-pill fw-bold shadow pulse-btn">
                            Próximo Nível <i className="bi bi-play-fill"></i>
                        </button>
                    </motion.div>
                )}

                {grid.map((row, rIndex) => (
                    <div key={rIndex} className="d-flex">
                        {row.map((letter, cIndex) => (
                            <div
                                key={`${rIndex}-${cIndex}`}
                                onClick={() => handleCellClick(rIndex, cIndex)}
                                className={`
                                    d-flex align-items-center justify-content-center fw-bold transition-all
                                    ${isSelected(rIndex, cIndex) ? 'bg-primary text-white scale-110' : 'text-secondary'}
                                `}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    borderRadius: '6px',
                                    margin: '1px',
                                    backgroundColor: isSelected(rIndex, cIndex) ? '' : '#f8f9fa'
                                }}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Lista de Palavras */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                {currentLevel.words.map(word => (
                    <span
                        key={word}
                        className={`badge px-3 py-2 rounded-pill transition-all ${foundWords.includes(word) ? 'bg-success text-white opacity-50' : 'bg-white text-dark border shadow-sm'}`}
                    >
                        {foundWords.includes(word) ? <i className="bi bi-check me-1"></i> : ''}
                        {word}
                    </span>
                ))}
            </div>

            {/* Final do Jogo */}
            {isGameComplete && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 bg-primary bg-opacity-10 rounded-4 border border-primary"
                >
                    <h3 className="text-primary fw-bold mb-2">Zerou o Jogo! 🏆</h3>
                    <p className="text-muted small mb-3">Sua saúde mental está em dia. Que tal cuidar da saúde física agora?</p>
                    <a href="/blog" className="btn btn-primary rounded-pill fw-bold w-100">
                        Ler Dicas de Saúde no Blog
                    </a>
                </motion.div>
            )}

            <style jsx>{`
                .scale-110 { transform: scale(1.1); }
                .pulse-btn { animation: pulse 1.5s infinite; }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

// Helper to prevent re-render issues
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
