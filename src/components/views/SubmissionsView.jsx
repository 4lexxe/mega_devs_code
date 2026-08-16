import React, { useState } from 'react';

export const SubmissionsView = ({ submissions = [] }) => {
    const [selectedSub, setSelectedSub] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [copied, setCopied] = useState(false);

    const filteredSubmissions = submissions.filter(s => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            (s.studentName && s.studentName.toLowerCase().includes(q)) ||
            (s.problemId && s.problemId.toLowerCase().includes(q)) ||
            (s.problemTitle && s.problemTitle.toLowerCase().includes(q)) ||
            (s.verdict && s.verdict.toLowerCase().includes(q)) ||
            (s.id && s.id.toLowerCase().includes(q))
        );
    });

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="view-page">
            {/* Header Section Title */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.6rem', fontFamily: 'var(--font-straight)', margin: 0 }}>
                        <i className="icon-history" style={{ color: 'var(--brand-cyan)', fontSize: '1.6rem' }} />
                        <span>Monitoreo en Vivo de Reenvíos de Alumnos</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.3rem' }}>
                        Visualización en tiempo real del código y veredictos de los estudiantes desde cualquier computadora.
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '20px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        color: '#ef4444',
                        fontSize: '0.78rem',
                        fontWeight: 700
                    }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                        🔴 CANAL EN VIVO (Auto-Sync)
                    </span>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="filter-toolbar" style={{ marginBottom: '1rem' }}>
                <div className="search-input-box" style={{ flex: 1 }}>
                    <i className="icon-search" style={{ color: 'var(--text-dim)' }} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre de alumno, ID de problema, veredicto..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '0 0.5rem' }}>
                    Total: <strong>{filteredSubmissions.length}</strong> envíos
                </div>
            </div>

            {/* Submissions Data Table */}
            <div className="data-table-card">
                <table className="devs-table">
                    <thead>
                        <tr>
                            <th style={{ width: '100px' }}># ID</th>
                            <th>Alumno / Estudiante</th>
                            <th>Fecha & Hora</th>
                            <th>Ejercicio</th>
                            <th style={{ width: '130px' }}>Veredicto</th>
                            <th style={{ width: '80px' }}>Puntaje</th>
                            <th style={{ width: '90px' }}>Tiempo</th>
                            <th style={{ width: '120px' }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <i className="icon-history" style={{ fontSize: '2rem', opacity: 0.4 }} />
                                        <p style={{ margin: 0 }}>
                                            {submissions.length === 0
                                                ? 'No hay envíos registrados en el sistema. Los reenvíos de los alumnos aparecerán aquí en vivo.'
                                                : 'No hay envíos que coincidan con la búsqueda.'}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredSubmissions.map(s => {
                                const isAc = s.verdict === 'ACCEPTED';
                                return (
                                    <tr key={s.id}>
                                        <td><strong style={{ color: 'var(--text-main)', fontFamily: 'var(--font-code)' }}>{s.id}</strong></td>
                                        <td>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                fontWeight: 600,
                                                color: 'var(--text-main)',
                                                background: 'var(--bg-surface-elevated)',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '6px',
                                                border: '1px solid var(--border-color)',
                                                fontSize: '0.82rem'
                                            }}>
                                                <i className="icon-user" style={{ color: 'var(--brand-cyan)' }} />
                                                {s.studentName || 'Alumno'}
                                            </span>
                                        </td>
                                        <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.timestamp}</td>
                                        <td>
                                            <strong style={{ color: 'var(--text-main)' }}>{s.problemId}</strong>
                                            <span style={{ color: 'var(--text-muted)', marginLeft: '0.4rem', fontSize: '0.82rem' }}>
                                                - {s.problemTitle}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge-diff ${isAc ? 'Fácil' : 'Difícil'}`} style={{
                                                background: isAc ? 'var(--status-ac-bg)' : 'var(--status-wa-bg)',
                                                color: isAc ? 'var(--status-ac)' : 'var(--status-wa)',
                                                border: `1px solid ${isAc ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                                                fontWeight: 700
                                            }}>
                                                {s.verdict}
                                            </span>
                                        </td>
                                        <td><strong style={{ color: isAc ? 'var(--status-ac)' : 'var(--text-main)' }}>{s.score} pts</strong></td>
                                        <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.timeMs} ms</td>
                                        <td>
                                            <button
                                                className="btn-devs btn-devs-secondary"
                                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                                                onClick={() => setSelectedSub(s)}
                                            >
                                                <i className="icon-code" style={{ fontSize: '0.75rem' }} />
                                                <span>Inspeccionar</span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Inspector Modal / Live Code Viewer for Teachers */}
            {selectedSub && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.82)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        width: '100%',
                        maxWidth: '850px',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                    }}>
                        {/* Modal Header */}
                        <div style={{
                            display: 'flex',
                            justify: 'space-between',
                            alignItems: 'center',
                            padding: '1rem 1.5rem',
                            background: 'var(--bg-surface-elevated)',
                            borderBottom: '1px solid var(--border-color)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <i className="icon-user" style={{ fontSize: '1.2rem', color: 'var(--brand-cyan)' }} />
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'var(--font-straight)' }}>
                                        Inspeccionando Solución de {selectedSub.studentName || 'Alumno'}
                                    </h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        Envío #{selectedSub.id} • {selectedSub.timestamp}
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span className={`badge-diff ${selectedSub.verdict === 'ACCEPTED' ? 'Fácil' : 'Difícil'}`}>
                                    {selectedSub.verdict}
                                </span>
                                <button
                                    onClick={() => setSelectedSub(null)}
                                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem', padding: '0.2rem 0.5rem' }}
                                >
                                    ✖
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1 }}>
                            {/* Summary Metadata Card */}
                            <div style={{
                                background: 'var(--bg-dark)',
                                padding: '0.8rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                marginBottom: '1rem',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                gap: '0.8rem',
                                fontSize: '0.82rem'
                            }}>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Ejercicio:</span>
                                    <strong style={{ color: 'var(--text-main)' }}>{selectedSub.problemId} - {selectedSub.problemTitle}</strong>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Puntaje Obtenido:</span>
                                    <strong style={{ color: selectedSub.verdict === 'ACCEPTED' ? 'var(--status-ac)' : 'var(--text-main)' }}>{selectedSub.score} / 100 pts</strong>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Tiempo de Ejecución:</span>
                                    <strong>{selectedSub.timeMs || 0} ms</strong>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Memoria Utilizada:</span>
                                    <strong>{selectedSub.memoryMB || 0} MB</strong>
                                </div>
                            </div>

                            {/* Code Viewer Title & Copy Action */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <i className="icon-code" /> Código Fuente Enviado por el Alumno (Main.java):
                                </label>
                                <button
                                    className="btn-devs btn-devs-secondary"
                                    onClick={() => handleCopyCode(selectedSub.code)}
                                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                                >
                                    <i className={copied ? "icon-ok-circled" : "icon-docs"} />
                                    <span>{copied ? '¡Copiado!' : 'Copiar Código del Alumno'}</span>
                                </button>
                            </div>

                            {/* Code Container */}
                            <pre style={{
                                background: 'var(--bg-dark)',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                fontFamily: 'var(--font-code)',
                                fontSize: '0.84rem',
                                color: '#f8fafc',
                                overflowX: 'auto',
                                lineHeight: '1.45',
                                margin: 0,
                                maxHeight: '380px'
                            }}>
                                <code>{selectedSub.code || '// El alumno no envió código.'}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
