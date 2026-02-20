"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ArquivosPage() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [text, setText] = useState("");
    const [status, setStatus] = useState("Sincronizado");
    const [files, setFiles] = useState<{ name: string; url: string; size: number }[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    // TODO: Change password if needed
    const SECRET_KEY = "otto123";

    useEffect(() => {
        // Mudar fundo só desta página sem afetar globals
        document.body.style.backgroundColor = "#121212";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === SECRET_KEY) {
            setIsAuthenticated(true);
            fetchText();
            fetchFiles();
        } else {
            alert("Senha incorreta");
        }
    };

    const fetchText = async () => {
        try {
            const res = await fetch("/api/arquivos/texto");
            const data = await res.json();
            if (data.text !== undefined) setText(data.text);
        } catch (e) {
            console.error("Erro ao puxar texto", e);
        }
    };

    const saveText = async (newText: string) => {
        setStatus("Salvando...");
        try {
            await fetch("/api/arquivos/texto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newText })
            });
            setStatus("Salvo!");
            setTimeout(() => setStatus("Sincronizado"), 2000);
        } catch (e) {
            setStatus("Erro ao salvar");
        }
    };

    const fetchFiles = async () => {
        try {
            const res = await fetch("/api/arquivos/lista");
            const data = await res.json();
            if (data.files) setFiles(data.files);
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
                // Refresh
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

    // Auto-save delay
    useEffect(() => {
        if (!isAuthenticated) return;
        const delayDebounceFn = setTimeout(() => {
            saveText(text);
        }, 1000); // Salva 1s após parar de digitar

        return () => clearTimeout(delayDebounceFn);
    }, [text, isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#1e1e1e" }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-4 shadow-lg"
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

    return (
        <div className="min-vh-100 py-5" style={{ backgroundColor: "#121212" }}>
            <div className="container">

                <div className="row g-4 justify-content-center">
                    <div className="col-12 col-lg-10">
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="d-flex align-items-center gap-3">
                                <i className="bi bi-shield-lock-fill fs-2 text-primary"></i>
                                <div>
                                    <h3 className="text-white mb-0 fw-bold">Transferidor Pessoal</h3>
                                    <span style={{ fontSize: "0.8rem", color: "#aaa" }}>Sincronizando entre Celular e PC</span>
                                </div>
                            </div>
                            <button onClick={() => setIsAuthenticated(false)} className="btn btn-outline-danger rounded-pill px-4">Sair</button>
                        </div>

                        <div className="row g-4">
                            {/* Bloco de Notas */}
                            <div className="col-md-7">
                                <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden" style={{ backgroundColor: "#242424" }}>
                                    <div className="card-header bg-transparent border-dark border-bottom d-flex justify-content-between align-items-center p-3">
                                        <h5 className="text-white mb-0 fw-bold d-flex align-items-center gap-2">
                                            <i className="bi bi-journal-text text-primary"></i> Notepad Online
                                        </h5>
                                        <span className={`badge ${status === 'Salvo!' || status === 'Sincronizado' ? 'bg-success' : 'bg-warning'} bg-opacity-25 rounded-pill`} style={{ color: status === 'Salvo!' || status === 'Sincronizado' ? '#28a745' : '#ffc107' }}>
                                            {status === 'Sincronizado' ? <><i className="bi bi-cloud-check-fill me-1"></i> {status}</> : <><i className="bi bi-arrow-repeat spin me-1"></i> {status}</>}
                                        </span>
                                    </div>
                                    <div className="card-body p-0 position-relative d-flex flex-column h-100">
                                        <textarea
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            className="form-control border-0 bg-transparent text-white shadow-none w-100 flex-grow-1 p-4"
                                            placeholder="Cole links ou textos aqui no celular e pegue no PC (ou vice-versa)... O salvamento é automático!"
                                            style={{ minHeight: "400px", resize: "none" }}
                                            spellCheck={false}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Arquivos */}
                            <div className="col-md-5">
                                <div className="card border-0 shadow-lg rounded-4" style={{ backgroundColor: "#242424", height: "100%", maxHeight: "500px" }}>
                                    <div className="card-header bg-transparent border-dark border-bottom p-3">
                                        <h5 className="text-white mb-0 fw-bold d-flex align-items-center gap-2">
                                            <i className="bi bi-folder-fill text-warning"></i> Upload de Arquivos
                                        </h5>
                                    </div>
                                    <div className="card-body d-flex flex-column p-0">

                                        {/* Dropzone area fake */}
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
                                            <h6 className="text-muted small text-uppercase fw-bold mb-3 px-2">Arquivos Disponíveis</h6>
                                            <div className="d-flex flex-column gap-2">
                                                {files.length === 0 ? (
                                                    <div className="text-center py-4 text-muted small">Nenhum arquivo enviado.</div>
                                                ) : (
                                                    files.map((f, i) => (
                                                        <a href={f.url} target="_blank" rel="noopener noreferrer" key={i} className="text-decoration-none p-3 rounded-3 d-flex align-items-center gap-3 transition-hover" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                                                            <div className="bg-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                                                <i className={`bi ${f.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'bi-image text-success' : f.name.match(/\.(pdf)$/i) ? 'bi-file-pdf-fill text-danger' : 'bi-file-earmark-text-fill text-primary'}`}></i>
                                                            </div>
                                                            <div className="flex-grow-1 overflow-hidden">
                                                                <div className="text-white w-100 text-truncate fw-bold mb-0" style={{ fontSize: "0.9rem" }}>{f.name}</div>
                                                                <div className="text-muted" style={{ fontSize: "0.75rem" }}>{(f.size / 1024).toFixed(1)} KB</div>
                                                            </div>
                                                            <i className="bi bi-download text-muted"></i>
                                                        </a>
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
                    .transition-hover:hover { background-color: rgba(255,255,255,0.1) !important; transform: translateY(-2px); }
                    .spin { animation: spin 1s linear infinite; }
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
                `}</style>

            </div>
        </div>
    );
}

