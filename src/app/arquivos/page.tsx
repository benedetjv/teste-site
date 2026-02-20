"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Note {
    id: string;
    content: string;
    createdAt: number;
}

interface FileData {
    name: string;
    url: string;
    size: number;
    mtime: number;
}

export default function ArquivosPage() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Notes state
    const [newNoteText, setNewNoteText] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);
    const [isSavingNote, setIsSavingNote] = useState(false);

    // Files state
    const [files, setFiles] = useState<FileData[]>([]);
    const [totalSize, setTotalSize] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    // TODO: Change password se quiser
    const SECRET_KEY = "otto123";

    useEffect(() => {
        // Mudar fundo só desta página
        document.body.style.backgroundColor = "#121212";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === SECRET_KEY) {
            setIsAuthenticated(true);
            fetchNotes();
            fetchFiles();
        } else {
            alert("Senha incorreta");
        }
    };

    // --- NOTES API ---
    const fetchNotes = async () => {
        try {
            const res = await fetch("/api/arquivos/texto");
            const data = await res.json();
            if (data.notes) setNotes(data.notes);
        } catch (e) {
            console.error("Erro ao puxar notas", e);
        }
    };

    const addNote = async () => {
        if (!newNoteText.trim()) return;
        setIsSavingNote(true);

        const newNote: Note = {
            id: Date.now().toString(),
            content: newNoteText,
            createdAt: Date.now()
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        setNewNoteText("");

        try {
            await fetch("/api/arquivos/texto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notes: updatedNotes })
            });
        } catch (e) {
            alert("Erro ao salvar a nota.");
        } finally {
            setIsSavingNote(false);
        }
    };

    const deleteNote = async (id: string) => {
        if (!window.confirm("Certeza que deseja deletar este texto?")) return;
        const updatedNotes = notes.filter(n => n.id !== id);
        setNotes(updatedNotes);

        try {
            await fetch("/api/arquivos/texto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notes: updatedNotes })
            });
        } catch (e) {
            alert("Erro ao deletar a nota.");
        }
    };

    const handleNoteKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            addNote();
        }
    };

    // --- FILES API ---
    const fetchFiles = async () => {
        try {
            const res = await fetch("/api/arquivos/lista");
            const data = await res.json();
            if (data.files) setFiles(data.files);
            if (data.totalSize) setTotalSize(data.totalSize);
            else setTotalSize(0);
        } catch (e) {
            console.error("Erro ao puxar arquivos", e);
        }
    };

    const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/arquivos/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                fetchFiles();
            } else {
                alert("Erro ao enviar: " + data.error);
            }
        } catch (error) {
            alert("Falha no envio do arquivo");
        } finally {
            setIsUploading(false);
        }
    };

    const deleteFile = async (url: string) => {
        if (!window.confirm("Certeza que deseja deletar este arquivo?")) return;
        try {
            const res = await fetch("/api/arquivos/deletar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });
            const data = await res.json();
            if (data.success) {
                fetchFiles();
            } else {
                alert("Erro ao deletar: " + data.error);
            }
        } catch (error) {
            alert("Falha ao deletar.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#1e1e1e" }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-4 shadow-lg mx-3"
                    style={{ backgroundColor: "#2d2d2d", maxWidth: "400px", width: "100%" }}
                >
                    <div className="text-center mb-4">
                        <i className="bi bi-lock-fill text-primary" style={{ fontSize: "2.5rem" }}></i>
                        <h4 className="text-white mt-3 fw-bold">Acesso Restrito</h4>
                        <p className="text-secondary small">Sistema de Transferência Pessoal</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control form-control-lg border-0 bg-dark text-white shadow-none"
                                placeholder="Digite a senha..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-lg">
                            ENTRAR <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 MB";
        const mb = bytes / (1024 * 1024);
        return mb.toFixed(2) + " MB";
    };

    const formatDate = (ts: number) => {
        return new Date(ts).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    };

    return (
        <div className="min-vh-100 py-3 py-md-5" style={{ backgroundColor: "#121212" }}>
            <div className="container">

                <div className="row g-4 justify-content-center">
                    <div className="col-12 col-xl-10">
                        {/* Header */}
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 p-3 rounded-4 gap-3" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="d-flex align-items-center gap-3">
                                <i className="bi bi-shield-lock-fill fs-2 text-primary"></i>
                                <div>
                                    <h3 className="text-white mb-0 fw-bold fs-4">Nuvem Pessoal</h3>
                                    <span style={{ fontSize: "0.8rem", color: "#aaa" }}>Transferência Segura</span>
                                </div>
                            </div>
                            <button onClick={() => setIsAuthenticated(false)} className="btn btn-outline-danger btn-sm rounded-pill px-4 ms-auto ms-md-0">Sair com Segurança</button>
                        </div>

                        <div className="row g-4">
                            {/* Bloco de Notas (Esquerda) */}
                            <div className="col-lg-7">
                                <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden" style={{ backgroundColor: "#242424" }}>
                                    <div className="card-header bg-transparent border-dark border-bottom p-3">
                                        <h5 className="text-white mb-0 fw-bold d-flex align-items-center gap-2">
                                            <i className="bi bi-journal-plus text-primary"></i> Notas & Textos
                                        </h5>
                                    </div>
                                    <div className="card-body p-3 p-md-4 d-flex flex-column" style={{ maxHeight: "700px" }}>

                                        {/* Input Box */}
                                        <div className="mb-4">
                                            <textarea
                                                value={newNoteText}
                                                onChange={(e) => setNewNoteText(e.target.value)}
                                                onKeyDown={handleNoteKeyDown}
                                                className="form-control border-0 text-white shadow-sm p-3 rounded-4 mb-2"
                                                placeholder="Cole seu texto ou link aqui... (Ctrl+Enter para adicionar)"
                                                style={{ minHeight: "100px", resize: "none", backgroundColor: "#1a1a1a" }}
                                                spellCheck={false}
                                            />
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    onClick={addNote}
                                                    disabled={!newNoteText.trim() || isSavingNote}
                                                    className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
                                                    style={{ fontSize: "0.9rem" }}
                                                >
                                                    {isSavingNote ? <i className="bi bi-arrow-repeat spin"></i> : "Adicionar Nota"}
                                                    {!isSavingNote && <i className="bi bi-plus-lg ms-1"></i>}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Notes List */}
                                        <div className="flex-grow-1 overflow-auto custom-scrollbar pe-2">
                                            <AnimatePresence>
                                                {notes.length === 0 ? (
                                                    <div className="text-center py-5 text-muted small">Nenhuma nota gravada.</div>
                                                ) : (
                                                    notes.map(note => (
                                                        <motion.div
                                                            key={note.id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            className="p-3 rounded-4 mb-3 position-relative group"
                                                            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.02)" }}
                                                        >
                                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                                <span className="badge bg-dark text-muted fw-normal" style={{ fontSize: "0.7rem" }}>
                                                                    {formatDate(note.createdAt)}
                                                                </span>
                                                                <button
                                                                    onClick={() => deleteNote(note.id)}
                                                                    className="btn btn-sm btn-link text-danger p-0 m-0 text-decoration-none hover-opacity"
                                                                    title="Excluir Nota"
                                                                >
                                                                    <i className="bi bi-trash-fill"></i>
                                                                </button>
                                                            </div>
                                                            <div className="text-white" style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem", lineHeight: "1.5" }}>
                                                                {note.content}
                                                            </div>
                                                        </motion.div>
                                                    ))
                                                )}
                                            </AnimatePresence>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Arquivos (Direita) */}
                            <div className="col-lg-5">
                                <div className="card shadow-lg rounded-4" style={{ backgroundColor: "#242424", border: "1px solid rgba(255,255,255,0.05)", height: "100%", maxHeight: "700px" }}>

                                    {/* Storage Usage Header */}
                                    <div className="card-header bg-transparent border-dark border-bottom p-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="text-white mb-0 fw-bold d-flex align-items-center gap-2">
                                                <i className="bi bi-folder-fill text-warning"></i> Arquivos
                                            </h5>
                                            <span className="badge bg-dark fw-normal px-2 py-1" style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#ccc" }}>
                                                {formatSize(totalSize)} / 250 MB
                                            </span>
                                        </div>
                                        {/* Progress bar visual */}
                                        <div className="progress rounded-pill bg-dark" style={{ height: "4px" }}>
                                            <div
                                                className={`progress-bar ${totalSize > 250 * 1024 * 1024 * 0.8 ? 'bg-danger' : 'bg-primary'}`}
                                                role="progressbar"
                                                style={{ width: `${Math.min((totalSize / (250 * 1024 * 1024)) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="card-body d-flex flex-column p-0">

                                        {/* Dropzone area */}
                                        <div className="p-3">
                                            <label className="d-flex flex-column align-items-center justify-content-center p-4 border rounded-4 w-100 text-center" style={{ borderStyle: "dashed !important", borderColor: "rgba(255,255,255,0.2) !important", backgroundColor: "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.3s" }}>
                                                {isUploading ? (
                                                    <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-cloud-arrow-up-fill text-muted fs-1 mb-2"></i>
                                                        <span className="text-white fw-bold">Clique para enviar foto ou arquivo</span>
                                                    </>
                                                )}
                                                <input type="file" className="d-none" onChange={uploadFile} disabled={isUploading} />
                                            </label>
                                        </div>

                                        {/* File list */}
                                        <div className="flex-grow-1 overflow-auto px-3 pb-3 custom-scrollbar">
                                            <h6 className="text-muted small text-uppercase fw-bold mb-3 px-2">Disponíveis</h6>
                                            <div className="d-flex flex-column gap-2">
                                                {files.length === 0 ? (
                                                    <div className="text-center py-4 text-muted small">Nenhum arquivo na nuvem.</div>
                                                ) : (
                                                    files.map((f, i) => (
                                                        <div key={i} className="p-2 rounded-3 d-flex align-items-center gap-3 transition-hover group-file" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                                                            <div className="bg-dark rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "40px", height: "40px" }}>
                                                                <i className={`bi ${f.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'bi-image text-success' : f.name.match(/\.(pdf)$/i) ? 'bi-file-pdf-fill text-danger' : 'bi-file-earmark-text-fill text-primary'}`}></i>
                                                            </div>
                                                            <div className="flex-grow-1 overflow-hidden">
                                                                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none w-100 text-truncate fw-bold mb-0 d-block" style={{ fontSize: "0.85rem" }}>
                                                                    {f.name}
                                                                </a>
                                                                <div className="text-muted d-flex gap-2" style={{ fontSize: "0.7rem" }}>
                                                                    <span>{formatSize(f.size)}</span>
                                                                    <span>•</span>
                                                                    <span>{formatDate(f.mtime)}</span>
                                                                </div>
                                                            </div>

                                                            {/* Actions container */}
                                                            <div className="d-flex gap-1">
                                                                <a href={f.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-link text-muted p-2 hover-opacity" title="Baixar">
                                                                    <i className="bi bi-download"></i>
                                                                </a>
                                                                <button onClick={() => deleteFile(f.url)} className="btn btn-sm btn-link text-danger p-2 hover-opacity" title="Excluir Definitivamente">
                                                                    <i className="bi bi-trash-fill"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .transition-hover:hover { background-color: rgba(255,255,255,0.1) !important; transform: translateY(-1px); }
                    .hover-opacity { opacity: 0.6; transition: 0.2s; }
                    .hover-opacity:hover { opacity: 1; }
                    .spin { animation: spin 1s linear infinite; }
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
                `}</style>

            </div>
        </div>
    );
}
