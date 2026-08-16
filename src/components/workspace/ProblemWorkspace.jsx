import React, { useState, useRef, useEffect } from 'react';
import { MarkdownLatexRenderer } from '../common/MarkdownLatexRenderer';
import { CodeEditor } from './CodeEditor';
import { JudgeConsole } from './JudgeConsole';

export const ProblemWorkspace = ({ problem, onBack, onRunCode, onSubmitCode, evalResults, isEvaluating }) => {
    const [activeTab, setActiveTab] = useState('statement');
    const [code, setCode] = useState(problem ? problem.starterCode : '');
    const [customInput, setCustomInput] = useState(problem && problem.examples ? problem.examples[0].input : '');
    const [customOutput, setCustomOutput] = useState('');
    const [copiedIndex, setCopiedIndex] = useState(null);

    // Mobile Panel Toggle State ('statement' | 'editor')
    const [mobilePanelTab, setMobilePanelTab] = useState('statement');
    const [isMobile, setIsMobile] = useState(false);

    // Dynamic Sizing State for Desktop
    const [leftPanelWidth, setLeftPanelWidth] = useState(45); // percentage %
    const [consoleHeight, setConsoleHeight] = useState(240); // pixels px
    const [isDraggingH, setIsDraggingH] = useState(false);
    const [isDraggingV, setIsDraggingV] = useState(false);

    const workspaceRef = useRef(null);
    const rightPanelRef = useRef(null);

    // Handle Window Resize to Detect Mobile Mode
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDraggingH && workspaceRef.current) {
                const rect = workspaceRef.current.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                let newWidthPercent = (offsetX / rect.width) * 100;
                if (newWidthPercent < 15) newWidthPercent = 15;
                if (newWidthPercent > 80) newWidthPercent = 80;
                setLeftPanelWidth(newWidthPercent);
            }

            if (isDraggingV && rightPanelRef.current) {
                const rect = rightPanelRef.current.getBoundingClientRect();
                let newHeightPx = rect.bottom - e.clientY;
                if (newHeightPx < 80) newHeightPx = 80;
                if (newHeightPx > rect.height - 100) newHeightPx = rect.height - 100;
                setConsoleHeight(newHeightPx);
            }
        };

        const handleMouseUp = () => {
            setIsDraggingH(false);
            setIsDraggingV(false);
        };

        if (isDraggingH || isDraggingV) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingH, isDraggingV]);

    if (!problem) return null;

    const handleCopy = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    const handleRunCustom = async () => {
        const res = await onRunCode(code, customInput, problem.id);
        setCustomOutput(res.error || res.output);
    };

    const handleSubmitSolution = () => {
        onSubmitCode(problem.id, code);
    };

    const hasAuxiliary = problem.auxiliaryCode || problem.category?.includes('PILAS');
    const auxFileName = problem.auxiliaryFilename || 'Stack.java';

    return (
        <div className="view-page workspace-mode">
            {/* Top Workspace Header */}
            <div className="workspace-top-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 1rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', minHeight: '52px', flexWrap: 'wrap', gap: '0.5rem' }}>
                <button className="btn-devs btn-devs-secondary" onClick={onBack} style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                    <i className="icon-left-open" />
                    <span>Volver</span>
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-straight)', margin: 0 }}>{problem.id} - {problem.title}</h2>
                    <span className={`badge-diff ${problem.difficulty}`}>{problem.difficulty}</span>
                </div>
                <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--brand-java)', border: '1px solid var(--border-color)' }}>
                    Java 17
                </div>
            </div>

            {/* Mobile View Switcher Bar (Only Visible on Mobile <= 768px) */}
            {isMobile && (
                <div className="mobile-workspace-nav">
                    <button
                        className={`mobile-workspace-btn ${mobilePanelTab === 'statement' ? 'active' : ''}`}
                        onClick={() => setMobilePanelTab('statement')}
                    >
                        <i className="icon-doc-text" />
                        <span>Consigna</span>
                    </button>
                    <button
                        className={`mobile-workspace-btn ${mobilePanelTab === 'editor' ? 'active' : ''}`}
                        onClick={() => setMobilePanelTab('editor')}
                    >
                        <i className="icon-code" />
                        <span>Editor & Juez</span>
                    </button>
                </div>
            )}

            {/* Split Workspace Panels */}
            <div className="split-workspace" ref={workspaceRef}>
                {/* Left Panel: Statement */}
                {(!isMobile || mobilePanelTab === 'statement') && (
                    <div className="panel-statement" style={{ width: isMobile ? '100%' : `${leftPanelWidth}%` }}>
                        <div className="sub-tabs" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                            <button className={`sub-tab-btn ${activeTab === 'statement' ? 'active' : ''}`} onClick={() => setActiveTab('statement')}>
                                Enunciado
                            </button>
                            {hasAuxiliary && (
                                <button className={`sub-tab-btn ${activeTab === 'auxiliary' ? 'active' : ''}`} onClick={() => setActiveTab('auxiliary')}>
                                    Clase Auxiliar ({auxFileName})
                                </button>
                            )}
                            <button className={`sub-tab-btn ${activeTab === 'hints' ? 'active' : ''}`} onClick={() => setActiveTab('hints')}>
                                Pistas & Complejidad
                            </button>
                        </div>

                        <div className="statement-body">
                            {activeTab === 'statement' && (
                                <div>
                                    <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.25rem', padding: '0.6rem 0.9rem', background: 'var(--bg-surface-elevated)', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                                        <span><i className="icon-clock" style={{ marginRight: '0.3rem' }} /> Límite de tiempo: <strong>{problem.timeLimit || 1.0}s</strong></span>
                                        <span><i className="icon-hdd" style={{ marginRight: '0.3rem' }} /> Límite de memoria: <strong>{problem.memoryLimit || 32} MB</strong></span>
                                        <span><i className="icon-award" style={{ marginRight: '0.3rem' }} /> Puntos: <strong>{problem.points || 100}</strong></span>
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <MarkdownLatexRenderer content={problem.description} />
                                    </div>

                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem' }}>Entrada</h3>
                                        <MarkdownLatexRenderer content={problem.inputDesc} />
                                    </div>

                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem' }}>Salida</h3>
                                        <MarkdownLatexRenderer content={problem.outputDesc} />
                                    </div>

                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem' }}>Restricciones</h3>
                                        <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            {problem.constraints && problem.constraints.map((c, i) => (
                                                <li key={i} style={{ padding: '0.2rem 0' }}>• {c}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.6rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem' }}>Ejemplos de Entrada / Salida</h3>
                                        {problem.examples && problem.examples.map((ex, i) => (
                                            <div key={i} className="example-card">
                                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                                                    <div style={{ borderRight: isMobile ? 'none' : '1px solid var(--border-color)', borderBottom: isMobile ? '1px solid var(--border-color)' : 'none' }}>
                                                        <div className="example-header">
                                                            <span>Entrada #{i + 1}</span>
                                                            <button className="copy-btn" onClick={() => handleCopy(ex.input, i)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                                                {copiedIndex === i ? <i className="icon-check" style={{ color: 'var(--status-ac)' }} /> : <i className="icon-copy" />}
                                                                <span>{copiedIndex === i ? 'Copiado' : 'Copiar'}</span>
                                                            </button>
                                                        </div>
                                                        <div className="example-code-pre">{ex.input}</div>
                                                    </div>
                                                    <div>
                                                        <div className="example-header">
                                                            <span>Salida Esperada</span>
                                                        </div>
                                                        <div className="example-code-pre">{ex.output}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'auxiliary' && (
                                <div>
                                    <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.9rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                                        <h4 style={{ color: 'var(--brand-cyan)', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                                            Estructura Académica: <code>{auxFileName}</code>
                                        </h4>
                                        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                                            Este ejercicio incluye la clase <code>{auxFileName}</code>. Puedes inspeccionar su implementación o utilizarla directamente en tu solución.
                                        </p>
                                    </div>
                                    <div className="example-code-pre" style={{ fontFamily: 'monospace', fontSize: '0.82rem', whiteSpace: 'pre-wrap', maxHeight: '450px', overflowY: 'auto' }}>
                                        {problem.auxiliaryCode || `public class Stack<ELEMENT> { ... }`}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'hints' && (
                                <div>
                                    {problem.hints && problem.hints.map((h, i) => (
                                        <div key={i} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                                            <h4 style={{ color: 'var(--brand-cyan)', marginBottom: '0.4rem' }}>{h.title}</h4>
                                            <p style={{ fontSize: '0.88rem' }}>{h.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Horizontal Resizer Handle (Desktop Only) */}
                {!isMobile && (
                    <div
                        className={`resizer-horizontal ${isDraggingH ? 'dragging' : ''}`}
                        onMouseDown={() => setIsDraggingH(true)}
                        title="Arrastra para ajustar el ancho de los paneles"
                    >
                        <div className="resizer-handle-icon-v" />
                    </div>
                )}

                {/* Right Panel: Code Editor & Judge Console */}
                {(!isMobile || mobilePanelTab === 'editor') && (
                    <div className="panel-editor-side" ref={rightPanelRef} style={{ width: isMobile ? '100%' : `${100 - leftPanelWidth}%` }}>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <CodeEditor
                                code={code}
                                setCode={setCode}
                                onResetCode={() => setCode(problem.starterCode)}
                                onFormatCode={() => setCode(code)}
                            />
                        </div>

                        {/* Vertical Resizer Handle (Desktop Only) */}
                        {!isMobile && (
                            <div
                                className={`resizer-vertical ${isDraggingV ? 'dragging' : ''}`}
                                onMouseDown={() => setIsDraggingV(true)}
                                title="Arrastra para ajustar la altura de la terminal"
                            >
                                <div className="resizer-handle-icon-h" />
                            </div>
                        )}

                        <div style={{ height: isMobile ? '280px' : `${consoleHeight}px`, minHeight: '80px' }}>
                            <JudgeConsole
                                onRunCode={handleRunCustom}
                                onSubmitCode={handleSubmitSolution}
                                customInput={customInput}
                                setCustomInput={setCustomInput}
                                customOutput={customOutput}
                                evalResults={evalResults}
                                isEvaluating={isEvaluating}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
