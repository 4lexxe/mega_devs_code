import React, { useState, useEffect } from 'react';
import { PythonLogo, JavaLogo, EditorIcon } from '../common/LanguageLogos';

export const MODULES_CONFIG = [
    {
        id: 'editor_python',
        title: 'Uso del Editor & Python Básico',
        subtitle: 'Módulo 0: Entorno & Fundamentos',
        language: 'Python 3',
        logoType: 'python',
        accentColor: '#38bdf8',
        description: 'Domina el editor Monaco, la consola de pruebas y los fundamentos de Python: lectura con input(), variables, condicionales y bucles.',
        filterFn: (p) => p.category === 'EDITOR -> INTRO' || p.category === 'PYTHON -> BASICO' || p.language === 'python'
    },
    {
        id: 'poo_java',
        title: 'Programación Orientada a Objetos (POO)',
        subtitle: 'Módulo 1: Objetos & Clases',
        language: 'Java 17',
        logoType: 'java',
        accentColor: '#818cf8',
        description: 'Fundamentos de POO en Java: creación de clases, instanciación de objetos con new, constructores, atributos y encapsulamiento.',
        filterFn: (p) => p.category === 'JAVA -> POO'
    },
    {
        id: 'arreglos_java',
        title: 'Arreglos y ArrayList en Java',
        subtitle: 'Módulo 2: Colecciones Lineales',
        language: 'Java 17',
        logoType: 'java',
        accentColor: '#60a5fa',
        description: 'Vectores unidimensionales, matrices bidimensionales, algoritmos puros de filtrado y búsqueda, y la colección dinámica ArrayList.',
        filterFn: (p) => p.category === 'JAVA -> ARREGLOS' || p.category === 'JAVA -> ARRAYLIST'
    },
    {
        id: 'pilas_stack',
        title: 'Pilas Stack y Expresiones',
        subtitle: 'Módulo 3: Estructuras LIFO',
        language: 'Java 17',
        logoType: 'java',
        accentColor: '#34d399',
        description: 'Operaciones fundamentales de Pilas (push, pop, peek, empty), algoritmos con pilas auxiliares y evaluación de expresiones balanceadas.',
        filterFn: (p) => p.category === 'JAVA -> PILAS STACK'
    }
];

export const ProblemCatalog = ({
    problems = [],
    userStats,
    onSelectProblem,
    onNavigateToCreate,
    selectedModuleId,
    onSelectModule
}) => {
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('all');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const solvedSet = new Set(userStats ? userStats.solved : []);
    const attemptedSet = new Set(userStats ? userStats.attempted : []);

    // Active module config if in module detail view
    const activeModule = MODULES_CONFIG.find(m => m.id === selectedModuleId);

    // Reset pagination when module or filters change
    useEffect(() => {
        setCurrentPage(1);
        setSearch('');
        setDifficulty('all');
    }, [selectedModuleId]);

    const renderLogo = (logoType, size = 36) => {
        if (logoType === 'python') return <PythonLogo size={size} />;
        if (logoType === 'java') return <JavaLogo size={size} />;
        return <EditorIcon size={size} />;
    };

    // Calculate module statistics
    const getModuleStats = (mod) => {
        const modProbs = problems.filter(mod.filterFn);
        const solvedCount = modProbs.filter(p => solvedSet.has(p.id)).length;
        const totalPoints = modProbs.reduce((acc, curr) => acc + (curr.points || 100), 0);
        const earnedPoints = modProbs.filter(p => solvedSet.has(p.id)).reduce((acc, curr) => acc + (curr.points || 100), 0);
        const percent = modProbs.length > 0 ? Math.round((solvedCount / modProbs.length) * 100) : 0;
        return { modProbs, solvedCount, totalPoints, earnedPoints, percent };
    };

    // If viewing a specific module, render Module Detail View (Banner + Module Exercise List)
    if (activeModule) {
        const { modProbs, solvedCount, totalPoints, earnedPoints, percent } = getModuleStats(activeModule);

        const filteredModuleProblems = modProbs.filter(p => {
            const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
            const matchDiff = difficulty === 'all' || p.difficulty === difficulty;
            return matchSearch && matchDiff;
        });

        const totalItems = filteredModuleProblems.length;
        const isAll = pageSize === 'all';
        const numPageSize = isAll ? totalItems : parseInt(pageSize, 10);
        const totalPages = isAll ? 1 : Math.max(1, Math.ceil(totalItems / numPageSize));
        const safeCurrentPage = Math.min(currentPage, totalPages);
        const startIndex = isAll ? 0 : (safeCurrentPage - 1) * numPageSize;
        const endIndex = isAll ? totalItems : Math.min(startIndex + numPageSize, totalItems);
        const paginatedModuleProblems = isAll ? filteredModuleProblems : filteredModuleProblems.slice(startIndex, endIndex);

        return (
            <div className="view-page">
                {/* Back Button */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <button
                        className="btn-devs btn-devs-secondary"
                        onClick={() => onSelectModule(null)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                    >
                        <i className="icon-left-open" />
                        <span>Volver a Módulos</span>
                    </button>
                </div>

                {/* Minimalist Hero Banner del Módulo */}
                <div className="module-hero-banner">
                    <div className="module-hero-header">
                        <div className="module-hero-logo-box">
                            {renderLogo(activeModule.logoType, 44)}
                        </div>
                        <div className="module-hero-title-box">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className="explore-lang-pill">
                                    {activeModule.language}
                                </span>
                                <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                                    {activeModule.subtitle}
                                </span>
                            </div>
                            <h1 className="module-hero-title">{activeModule.title}</h1>
                            <p className="module-hero-desc">{activeModule.description}</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="module-hero-stats-grid">
                        <div className="module-stat-card">
                            <span className="module-stat-val">{modProbs.length}</span>
                            <span className="module-stat-lbl">Ejercicios Totales</span>
                        </div>
                        <div className="module-stat-card">
                            <span className="module-stat-val" style={{ color: 'var(--status-ac)' }}>{solvedCount} / {modProbs.length}</span>
                            <span className="module-stat-lbl">Resueltos ({percent}%)</span>
                        </div>
                        <div className="module-stat-card">
                            <span className="module-stat-val" style={{ color: activeModule.accentColor }}>{earnedPoints} / {totalPoints}</span>
                            <span className="module-stat-lbl">Puntos Acumulados</span>
                        </div>
                        <div className="module-stat-card" style={{ flex: 1.5 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                                <span className="module-stat-lbl">Progreso del Módulo</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: activeModule.accentColor }}>{percent}%</span>
                            </div>
                            <div className="card-progress-bar-bg">
                                <div
                                    className="card-progress-bar-fill"
                                    style={{ width: `${percent}%`, background: activeModule.accentColor }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Toolbar inside Module */}
                <div className="filter-toolbar" style={{ marginBottom: '1rem' }}>
                    <div className="search-input-box">
                        <i className="icon-search" style={{ color: 'var(--text-dim)' }} />
                        <input
                            type="text"
                            placeholder={`Buscar ejercicio en este módulo...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <select className="select-dropdown" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="all">Todas las Dificultades</option>
                            <option value="Fácil">Fácil</option>
                            <option value="Medio">Medio</option>
                            <option value="Difícil">Difícil</option>
                        </select>
                    </div>
                </div>

                {/* Exercises Table for this Module */}
                {renderTable(paginatedModuleProblems, solvedSet, attemptedSet, onSelectProblem, onNavigateToCreate, totalItems, startIndex, endIndex, pageSize, setPageSize, isAll, totalPages, safeCurrentPage, setCurrentPage)}
            </div>
        );
    }

    // Render Main Catalog Landing Page (Module Cards Grid ONLY)
    return (
        <div className="view-page">
            {/* Header Title */}
            <div style={{ marginBottom: '1.75rem' }}>
                <h1 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-straight)', marginBottom: '0.3rem', margin: 0 }}>
                    Cursos & Módulos de Aprendizaje
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
                    Selecciona un módulo para explorar sus ejercicios y teoría.
                </p>
            </div>

            {/* Featured Course Cards Grid ONLY */}
            <div className="track-cards-grid">
                {MODULES_CONFIG.map(mod => {
                    const { modProbs, solvedCount, percent } = getModuleStats(mod);
                    return (
                        <div
                            key={mod.id}
                            className="explore-card"
                            onClick={() => onSelectModule(mod.id)}
                        >
                            <div className="explore-card-top">
                                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                                    <div className="explore-card-icon-wrapper">
                                        {renderLogo(mod.logoType, 36)}
                                    </div>
                                    <div>
                                        <span className="explore-card-subtitle">{mod.subtitle}</span>
                                        <h3 className="explore-card-title">{mod.title}</h3>
                                    </div>
                                </div>
                                <span className="explore-lang-pill">
                                    {mod.language}
                                </span>
                            </div>

                            <div className="explore-card-body">
                                <p className="explore-card-desc">{mod.description}</p>

                                {/* Progress Bar & Metrics */}
                                <div className="card-progress-container">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 600 }}>
                                        <span style={{ color: 'var(--text-muted)' }}>{solvedCount} de {modProbs.length} resueltos</span>
                                        <span style={{ color: mod.accentColor }}>{percent}%</span>
                                    </div>
                                    <div className="card-progress-bar-bg">
                                        <div
                                            className="card-progress-bar-fill"
                                            style={{ width: `${percent}%`, background: mod.accentColor }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.6rem', borderTop: '1px solid var(--border-color)' }}>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                        {modProbs.length} Ejercicios
                                    </span>
                                    <button className="btn-devs btn-devs-primary" style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem' }}>
                                        <span>Entrar al Módulo</span>
                                        <i className="icon-play" style={{ fontSize: '0.7rem' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Reusable Problem Data Table Component
function renderTable(paginatedProblems, solvedSet, attemptedSet, onSelectProblem, onNavigateToCreate, totalItems, startIndex, endIndex, pageSize, setPageSize, isAll, totalPages, safeCurrentPage, setCurrentPage) {
    return (
        <div className="data-table-card">
            <table className="devs-table">
                <thead>
                    <tr>
                        <th style={{ width: '55px' }}>Estado</th>
                        <th style={{ width: '75px' }}>ID</th>
                        <th>Título del Problema</th>
                        <th>Sección</th>
                        <th style={{ width: '100px' }}>Dificultad</th>
                        <th style={{ width: '130px' }}>Categoría</th>
                        <th style={{ width: '110px' }}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProblems.length === 0 ? (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-muted)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                                    <i className="icon-search" style={{ fontSize: '2rem', opacity: 0.4 }} />
                                    <p style={{ margin: 0 }}>No hay ejercicios que coincidan con la búsqueda.</p>
                                    <button className="btn-devs btn-devs-primary" onClick={onNavigateToCreate} style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                                        <i className="icon-plus-circled" />
                                        <span>Crear Nuevo Ejercicio</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        paginatedProblems.map(p => {
                            const isSolved = solvedSet.has(p.id);
                            const isAttempted = attemptedSet.has(p.id);

                            return (
                                <tr key={p.id} onClick={() => onSelectProblem(p)} style={{ cursor: 'pointer' }}>
                                    <td>
                                        {isSolved ? (
                                            <span title="Resuelto correctamente" style={{ color: 'var(--status-ac)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <i className="icon-ok-circled" />
                                            </span>
                                        ) : isAttempted ? (
                                            <span title="Intentado" style={{ color: 'var(--status-wa)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <i className="icon-attention" />
                                            </span>
                                        ) : (
                                            <span title="Sin resolver" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <i className="icon-circle-empty" />
                                            </span>
                                        )}
                                    </td>
                                    <td><strong style={{ color: 'var(--text-main)', fontFamily: 'var(--font-code)' }}>{p.id}</strong></td>
                                    <td>
                                        <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>{p.title}</strong>
                                    </td>
                                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{p.sectionTitle || p.track || 'General'}</td>
                                    <td>
                                        <span className={`badge-diff ${p.difficulty}`}>
                                            {p.difficulty}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.category || 'General'}</td>
                                    <td>
                                        <button className="btn-devs btn-devs-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
                                            <span>Resolver</span>
                                            <i className="icon-play" style={{ fontSize: '0.7rem' }} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>

            {/* Pagination Controls Footer */}
            {totalItems > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.25rem', background: 'var(--bg-surface-elevated)', borderTop: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                        Mostrando <strong>{startIndex + 1}</strong> a <strong>{endIndex}</strong> de <strong>{totalItems}</strong> ejercicios
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span>Mostrar:</span>
                            <select
                                className="select-dropdown"
                                value={pageSize}
                                onChange={(e) => setPageSize(e.target.value)}
                                style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                            >
                                <option value={5}>5 por página</option>
                                <option value={10}>10 por página</option>
                                <option value={20}>20 por página</option>
                                <option value="all">Ver Todos</option>
                            </select>
                        </div>

                        {!isAll && totalPages > 1 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <button
                                    className="btn-devs btn-devs-secondary"
                                    disabled={safeCurrentPage === 1}
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', opacity: safeCurrentPage === 1 ? 0.4 : 1 }}
                                >
                                    « Ant
                                </button>
                                <span style={{ fontWeight: 600, padding: '0 0.4rem' }}>
                                    {safeCurrentPage} / {totalPages}
                                </span>
                                <button
                                    className="btn-devs btn-devs-secondary"
                                    disabled={safeCurrentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', opacity: safeCurrentPage === totalPages ? 0.4 : 1 }}
                                >
                                    Sig »
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
