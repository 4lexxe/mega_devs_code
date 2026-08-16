import React, { useState, useEffect } from 'react';

export const ProblemCatalog = ({ problems = [], userStats, onSelectProblem, onNavigateToCreate }) => {
    const [selectedTrack, setSelectedTrack] = useState('all');
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('all');
    const [category, setCategory] = useState('all');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const solvedSet = new Set(userStats ? userStats.solved : []);
    const attemptedSet = new Set(userStats ? userStats.attempted : []);

    // Course Cards / Rutas de Aprendizaje
    const exploreCards = [
        {
            id: 'POO Java',
            subtitle: "Programación Orientada a Objetos",
            title: 'POO: Clases, Atributos y Objetos',
            gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            chapters: 2,
            items: problems.filter(p => p.category && p.category.includes('POO')).length,
            progress: 0,
            filterCategory: 'JAVA -> POO'
        },
        {
            id: 'Arreglos y ArrayList',
            subtitle: 'Fundamentos de Colecciones',
            title: 'Arreglos y ArrayList en Java',
            gradient: 'linear-gradient(135deg, #1e293b 0%, #2563eb 100%)',
            chapters: 3,
            items: problems.filter(p => p.category && (p.category.includes('ARREGLOS') || p.category.includes('ARRAYLIST'))).length,
            progress: 0,
            filterCategory: 'JAVA -> ARREGLOS'
        },
        {
            id: 'Pilas Stack',
            subtitle: 'Estructuras LIFO en Java',
            title: 'Pilas Stack y Expresiones',
            gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
            chapters: 3,
            items: problems.filter(p => p.category && p.category.includes('PILAS')).length,
            progress: 0,
            filterCategory: 'JAVA -> PILAS STACK'
        }
    ];

    const filteredProblems = problems.filter(p => {
        let matchTrack = true;
        if (selectedTrack !== 'all') {
            if (selectedTrack === 'JAVA -> ARREGLOS') {
                matchTrack = p.category === 'JAVA -> ARREGLOS' || p.category === 'JAVA -> ARRAYLIST';
            } else if (selectedTrack.startsWith('JAVA ->')) {
                matchTrack = p.category === selectedTrack;
            } else {
                matchTrack = p.track === selectedTrack;
            }
        }
        const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
        const matchDiff = difficulty === 'all' || p.difficulty === difficulty;
        const matchCat = category === 'all' || p.category === category || (p.tags && p.tags.includes(category));

        return matchTrack && matchSearch && matchDiff && matchCat;
    });

    // Reset page to 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTrack, search, difficulty, category, pageSize]);

    // Calculate Pagination bounds
    const totalItems = filteredProblems.length;
    const isAll = pageSize === 'all';
    const numPageSize = isAll ? totalItems : parseInt(pageSize, 10);
    const totalPages = isAll ? 1 : Math.max(1, Math.ceil(totalItems / numPageSize));

    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = isAll ? 0 : (safeCurrentPage - 1) * numPageSize;
    const endIndex = isAll ? totalItems : Math.min(startIndex + numPageSize, totalItems);
    const paginatedProblems = isAll ? filteredProblems : filteredProblems.slice(startIndex, endIndex);

    return (
        <div className="view-page">
            {/* Header Section Title */}
            <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-straight)', marginBottom: '0.2rem', margin: 0 }}>
                        Cursos & Rutas de Aprendizaje MEGA DEVS
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginTop: '0.2rem' }}>
                        Selecciona un módulo o filtra los ejercicios paginados por categoría y nivel.
                    </p>
                </div>
                {selectedTrack !== 'all' && (
                    <button className="btn-devs btn-devs-secondary" onClick={() => setSelectedTrack('all')} style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}>
                        <span>Ver Todos ({problems.length})</span>
                    </button>
                )}
            </div>

            {/* Featured Course Cards Grid */}
            <div className="track-cards-grid">
                {exploreCards.map(card => {
                    const targetFilter = card.filterCategory || card.filterTrack;
                    const isSelected = selectedTrack === targetFilter;
                    return (
                        <div
                            key={card.id}
                            className={`explore-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setSelectedTrack(isSelected ? 'all' : targetFilter)}
                        >
                            <div className="explore-card-banner" style={{ background: card.gradient }}>
                                <div>
                                    <span className="explore-card-subtitle">{card.subtitle}</span>
                                    <h3 className="explore-card-title">{card.title}</h3>
                                </div>
                                <button className="explore-play-btn" title="Empezar módulo">
                                    <i className="icon-play" style={{ fontSize: '0.85rem' }} />
                                </button>
                            </div>
                            <div className="explore-card-body">
                                <div className="explore-card-metrics">
                                    <div>
                                        <span className="metric-num">{card.chapters}</span>
                                        <span className="metric-lbl">Capítulos</span>
                                    </div>
                                    <div>
                                        <span className="metric-num">{card.items}</span>
                                        <span className="metric-lbl">Ejercicios</span>
                                    </div>
                                    <div>
                                        <span className="metric-num">{card.progress}%</span>
                                        <span className="metric-lbl">Completado</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Active Route Badge Banner if filtered */}
            {selectedTrack !== 'all' && (
                <div style={{ marginBottom: '1rem', padding: '0.6rem 1rem', background: 'var(--bg-surface-elevated)', borderLeft: '4px solid var(--brand-cyan)', border: '1px solid var(--border-color)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <i className="icon-layers" style={{ color: 'var(--text-muted)' }} />
                        Ruta Activa: <strong>{selectedTrack}</strong> ({filteredProblems.length} ejercicios filtrados)
                    </span>
                    <button className="btn-devs btn-devs-secondary" onClick={() => setSelectedTrack('all')} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                        Quitar Filtro
                    </button>
                </div>
            )}

            {/* Filter Toolbar */}
            <div className="filter-toolbar">
                <div className="search-input-box">
                    <i className="icon-search" style={{ color: 'var(--text-dim)' }} />
                    <input
                        type="text"
                        placeholder="Buscar por código (P1, PY1), título..."
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
                    <select className="select-dropdown" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="all">Todas las Categorías</option>
                        <option value="JAVA -> POO">JAVA -&gt; POO (Objetos)</option>
                        <option value="JAVA -> ARREGLOS">JAVA -&gt; ARREGLOS</option>
                        <option value="JAVA -> ARRAYLIST">JAVA -&gt; ARRAYLIST</option>
                        <option value="JAVA -> PILAS STACK">JAVA -&gt; PILAS STACK</option>
                    </select>
                </div>
            </div>

            {/* Problems Data Table */}
            <div className="data-table-card">
                <table className="devs-table">
                    <thead>
                        <tr>
                            <th style={{ width: '55px' }}>Estado</th>
                            <th style={{ width: '65px' }}>ID</th>
                            <th>Título del Problema</th>
                            <th>Curso / Módulo</th>
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
                                        <p style={{ margin: 0 }}>No hay ejercicios que coincidan con los filtros seleccionados.</p>
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
                                            {p.sectionTitle && (
                                                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                                                    {p.sectionTitle}
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{p.track || 'General'}</td>
                                        <td>
                                            <span className={`badge-diff ${p.difficulty}`}>
                                                {p.difficulty}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.category || 'JAVA'}</td>
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
        </div>
    );
};
