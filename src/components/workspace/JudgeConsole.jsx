import React, { useState } from 'react';

export const JudgeConsole = ({
    onRunCode,
    onSubmitCode,
    customInput,
    setCustomInput,
    customOutput,
    evalResults,
    isEvaluating
}) => {
    const [activeTab, setActiveTab] = useState('results');

    const renderResults = () => {
        if (!evalResults) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '140px', color: 'var(--text-dim)', fontSize: '0.85rem', gap: '0.5rem' }}>
                    <i className="icon-code" style={{ fontSize: '2rem', opacity: 0.5 }} />
                    <p>Haz clic en <strong>Ejecutar Prueba</strong> o <strong>Enviar Solución</strong> para evaluar tu código en Java.</p>
                </div>
            );
        }

        const isAc = evalResults.verdict === 'ACCEPTED';
        const verdictText = evalResults.verdict || (evalResults.error ? "ERROR" : "RESULTADO");
        const verdictTitleText = evalResults.verdictTitle || evalResults.error || "Evaluación finalizada.";

        return (
            <div>
                {/* Verdict Banner */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    marginBottom: '0.8rem',
                    background: isAc ? 'var(--status-ac-bg)' : 'var(--status-wa-bg)',
                    border: `1px solid ${isAc ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{
                            padding: '0.2rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: isAc ? 'var(--status-ac)' : 'var(--status-wa)',
                            color: '#fff'
                        }}>
                            {verdictText}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{verdictTitleText}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span><i className="icon-clock" style={{ marginRight: '0.2rem' }} /> {evalResults.timeMs || 0} ms</span>
                        <span><i className="icon-hdd" style={{ marginRight: '0.2rem' }} /> {evalResults.memoryMB || 0} MB</span>
                        <span><i className="icon-award" style={{ marginRight: '0.2rem' }} /> {evalResults.score || 0} / {evalResults.totalPoints || 100} pts</span>
                    </div>
                </div>

                {/* Testcase details */}
                {evalResults.testcaseResults && evalResults.testcaseResults.map((tc, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem 0.8rem', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Caso de Prueba #{tc.id} {tc.isSample ? '(Ejemplo)' : '(Oculto)'}</span>
                            <span style={{ color: tc.passed ? 'var(--status-ac)' : 'var(--status-wa)', fontWeight: 700 }}>
                                {tc.verdict} ({tc.timeMs} ms)
                            </span>
                        </div>
                        {!tc.passed && (
                            <div style={{ marginTop: '0.4rem', background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '4px', fontFamily: 'var(--font-code)', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <div>
                                    <strong style={{ color: 'var(--status-wa)', display: 'block', marginBottom: '0.2rem' }}>Obtenido:</strong>
                                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: 'var(--text-main)', background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.5rem', borderRadius: '4px' }}>{tc.actual || 'N/A'}</pre>
                                </div>
                                <div>
                                    <strong style={{ color: 'var(--status-ac)', display: 'block', marginBottom: '0.2rem' }}>Esperado:</strong>
                                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: 'var(--text-main)', background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.5rem', borderRadius: '4px' }}>{tc.expected}</pre>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="console-drawer-bottom">
            <div className="console-bar">
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button
                        className={`sub-tab-btn ${activeTab === 'results' ? 'active' : ''}`}
                        onClick={() => setActiveTab('results')}
                    >
                        <i className="icon-code" style={{ marginRight: '0.4rem' }} />
                        <span>Resultado de Evaluación</span>
                    </button>
                    <button
                        className={`sub-tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
                        onClick={() => setActiveTab('custom')}
                    >
                        <i className="icon-play" style={{ marginRight: '0.4rem' }} />
                        <span>Entrada Personalizada</span>
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button className="btn-devs btn-devs-secondary" onClick={() => { setActiveTab('custom'); onRunCode(); }}>
                        <i className="icon-play" />
                        <span>Ejecutar Prueba</span>
                    </button>
                    <button className="btn-devs btn-devs-primary" onClick={() => { setActiveTab('results'); onSubmitCode(); }} disabled={isEvaluating}>
                        <i className="icon-ok-circled" />
                        <span>{isEvaluating ? 'Evaluando...' : 'Enviar Solución'}</span>
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                {activeTab === 'results' && renderResults()}

                {activeTab === 'custom' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', height: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Entrada Estándar (System.in):</label>
                            <textarea
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                style={{ flex: 1, background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontFamily: 'var(--font-code)', fontSize: '0.82rem', padding: '0.5rem', resize: 'none', outline: 'none' }}
                                placeholder="Escribe aquí los datos de entrada..."
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Salida Generada (System.out):</label>
                            <textarea
                                readOnly
                                value={customOutput}
                                style={{ flex: 1, background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontFamily: 'var(--font-code)', fontSize: '0.82rem', padding: '0.5rem', resize: 'none', outline: 'none' }}
                                placeholder="La salida de tu programa aparecerá aquí..."
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
