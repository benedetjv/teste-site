"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
    "ALIVIO", "COLUNA", "SAUDE", "JOELHO",
    "VIDA", "OTTO", "QUADRIL", "PAZ"
];

const GRID_SIZE = 10;

export default function WordSearchGame() {
    const [grid, setGrid] = useState<string[][]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [selectedCells, setSelectedCells] = useState<{ r: number, c: number }[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [startCell, setStartCell] = useState<{ r: number, c: number } | null>(null);
    const [successMsg, setSuccessMsg] = useState('');

    // Inicializa o Grid
    useEffect(() => {
        generateGrid();
    }, []);

    const generateGrid = () => {
        // Cria grid vazio
        let newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));

        // Coloca as palavras
        WORDS.forEach(word => {
            let placed = false;
            while (!placed) {
                const direction = Math.random() > 0.5 ? 'H' : 'V';
                const row = Math.floor(Math.random() * GRID_SIZE);
                const col = Math.floor(Math.random() * GRID_SIZE);

                if (canPlaceWord(newGrid, word, row, col, direction)) {
                    placeWord(newGrid, word, row, col, direction);
                    placed = true;
                }
            }
        });

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
        if (!startCell) {
            setStartCell({ r, c });
            setSelectedCells([{ r, c }]);
        } else {
            // Tenta formar a palavra do Start até aqui
            checkSelection(startCell, { r, c });
            setStartCell(null);
            setSelectedCells([]);
        }
    };

    const checkSelection = (start: { r: number, c: number }, end: { r: number, c: number }) => {
        // Determina direção e pega as letras
        let word = "";
        let cells = [];

        // Horizontal
        if (start.r === end.r) {
            const minC = Math.min(start.c, end.c);
            const maxC = Math.max(start.c, end.c);
            for (let i = minC; i <= maxC; i++) {
                word += grid[start.r][i];
                cells.push({ r: start.r, c: i });
            }
        }
        // Vertical
        else if (start.c === end.c) {
            const minR = Math.min(start.r, end.r);
            const maxR = Math.max(start.r, end.r);
            for (let i = minR; i <= maxR; i++) {
                word += grid[i][start.c];
                cells.push({ r: i, c: start.c });
            }
        }
        // Diagonal (Simplificada - apenas eixos principais)
        else {
            return; // Ignora se não for reto por enquanto para facilitar no mobile
        }

        // Verifica se word ou reverse word está na lista
        const reversed = word.split('').reverse().join('');

        if (WORDS.includes(word) && !foundWords.includes(word)) {
            setFoundWords([...foundWords, word]);
            showSuccess(word);
        } else if (WORDS.includes(reversed) && !foundWords.includes(reversed)) {
            setFoundWords([...foundWords, reversed]);
            showSuccess(reversed);
        }
    };

    const showSuccess = (word: string) => {
        let msg = "";
        switch (word) {
            case "ALIVIO": msg = "Alívio é o nosso objetivo!"; break;
            case "COLUNA": msg = "Cuide bem da sua coluna!"; break;
            case "SAUDE": msg = "Saúde é prioridade."; break;
            case "OTTO": msg = "Você encontrou o Dr. Otto!"; break;
            default: msg = "Muito bem!";
        }
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(''), 2000);
    }

    const isCellSelect = (r: number, c: number) => {
        // Verifica se é o start
        if (startCell?.r === r && startCell?.c === c) return true;
        return false;
    }

    const isWordFound = (r: number, c: number) => {
        // Essa lógica de verificar se a célula pertence a uma palavra encontrada é complexa pra renderizar rapido
        // Vamos simplificar: Se a palavra foi achada, apenas marcamos na lista, sem pintar o grid permanentemente (ou pintamos depois)
        // Para MVP rapido, apenas risca a lista.
        return false;
    }

    return (
        <div className="text-center">
            <div className="mb-4">
                <h4 className="fw-bold mb-3" style={{ color: 'var(--azul-escuro)' }}>Caça-Palavras da Saúde</h4>
                <p className="small text-muted">Toque na <span className="text-primary fw-bold">primeira</span> e na <span className="text-primary fw-bold">última</span> letra para marcar.</p>
            </div>

            {/* Mensagem de Sucesso Flutuante */}
            <AnimatePresence>
                {successMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="alert alert-success position-absolute start-50 translate-middle-x shadow-sm py-1 px-3 rounded-pill"
                        style={{ zIndex: 10, top: '100px' }}
                    >
                        <i className="bi bi-star-fill me-2 text-warning"></i>
                        {successMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* GRID */}
            <div className="d-inline-block p-1 bg-white rounded shadow-sm border mb-4" style={{ touchAction: 'manipulation' }}>
                {grid.map((row, rIndex) => (
                    <div key={rIndex} className="d-flex">
                        {row.map((letter, cIndex) => (
                            <div
                                key={`${rIndex}-${cIndex}`}
                                onClick={() => handleCellClick(rIndex, cIndex)}
                                className={`
                                d-flex align-items-center justify-content-center fw-bold
                                ${isCellSelect(rIndex, cIndex) ? 'bg-primary text-white' : 'text-secondary'}
                            `}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    border: '1px solid #f0f0f0',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Lista de Palavras */}
            <div className="d-flex flex-wrap justify-content-center gap-2">
                {WORDS.map(word => (
                    <span
                        key={word}
                        className={`badge px-3 py-2 rounded-pill ${foundWords.includes(word) ? 'bg-success text-white text-decoration-line-through opacity-50' : 'bg-light text-dark border'}`}
                    >
                        {word}
                    </span>
                ))}
            </div>

            {foundWords.length === WORDS.length && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-4 p-3 bg-light rounded border border-success"
                >
                    <h5 className="text-success fw-bold">Parabéns! 🎉</h5>
                    <p className="small mb-0">Você completou o desafio. Sua mente está afiada!</p>
                </motion.div>
            )}
        </div>
    );
}
