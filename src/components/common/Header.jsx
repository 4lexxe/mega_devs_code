import React, { useState } from 'react';
import logoSvg from '../../assets/logo.svg';

export const Header = ({ currentView, setView, userStats, theme, toggleTheme, studentName, onUpdateStudentName }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [nameInput, setNameInput] = useState(studentName || 'Alumno');

    const handleSaveName = () => {
        if (nameInput.trim()) {
            onUpdateStudentName(nameInput.trim());
        }
        setIsEditingName(false);
    };

    return (
        <header className="app-header">
            <div className="brand-container">
                <img src={logoSvg} alt="DEVs PROJECT Logo" className="brand-logo-img" />
                <div className="brand-text">
                    <span className="brand-title">MEGA DEVS</span>
                    <span className="brand-sub">DEVs PROJECT Judge</span>
                </div>

                <nav className="nav-tabs">
                    <button
                        className={`nav-btn ${currentView === 'problems' ? 'active' : ''}`}
                        onClick={() => setView('problems')}
                    >
                        <i className="icon-code" style={{ fontSize: '1rem' }} />
                        <span>Explorar</span>
                    </button>
                    <button
                        className={`nav-btn ${currentView === 'submissions' ? 'active' : ''}`}
                        onClick={() => setView('submissions')}
                    >
                        <i className="icon-history" style={{ fontSize: '1rem' }} />
                        <span>Envíos</span>
                    </button>
                    <button
                        className={`nav-btn ${currentView === 'leaderboard' ? 'active' : ''}`}
                        onClick={() => setView('leaderboard')}
                    >
                        <i className="icon-trophy" style={{ fontSize: '1rem' }} />
                        <span>Ranking</span>
                    </button>
                    <button
                        className={`nav-btn ${currentView === 'create' ? 'active' : ''}`}
                        onClick={() => setView('create')}
                    >
                        <i className="icon-plus-circled" style={{ fontSize: '1rem' }} />
                        <span>Crear Ejercicio</span>
                    </button>
                </nav>
            </div>

            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
                    style={{
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        padding: '0.45rem 0.65rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        transition: 'all 0.2s ease'
                    }}
                >
                    {theme === 'dark' ? <i className="icon-sun" style={{ color: '#f59e0b' }} /> : <i className="icon-moon" style={{ color: '#6366f1' }} />}
                    <span>{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
                </button>

                <div className="stat-badge score" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-surface-elevated)', color: 'var(--text-main)', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid var(--border-color)' }}>
                    <i className="icon-award" style={{ color: 'var(--text-muted)' }} />
                    <span>{userStats ? userStats.score : 0} pts</span>
                </div>

                {/* Editable Student Identity */}
                <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.75rem', borderLeft: '1px solid var(--border-color)' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'var(--bg-surface-elevated)', color: 'var(--brand-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', border: '1px solid var(--border-color)' }}>
                        <i className="icon-user" />
                    </div>
                    {isEditingName ? (
                        <div style={{ display: 'flex', gap: '0.2rem' }}>
                            <input
                                type="text"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                                style={{ padding: '0.2rem 0.4rem', fontSize: '0.82rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', width: '110px' }}
                                autoFocus
                            />
                            <button className="btn-devs btn-devs-primary" onClick={handleSaveName} style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem' }}>✓</button>
                        </div>
                    ) : (
                        <span
                            onClick={() => setIsEditingName(true)}
                            title="Haz clic para cambiar tu nombre de alumno"
                            style={{ fontSize: '0.86rem', fontWeight: 600, fontFamily: 'var(--font-straight)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                            {studentName || 'Alumno'}
                            <i className="icon-pencil" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }} />
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
};
