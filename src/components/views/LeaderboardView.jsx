import React from 'react';

export const LeaderboardView = ({ leaderboard }) => {
    return (
        <div className="view-page">
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.6rem', fontFamily: 'var(--font-straight)' }}>
                    <i className="icon-trophy" style={{ color: 'var(--text-main)', fontSize: '1.6rem' }} />
                    <span>Tabla de Posiciones y Ranking Global</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Compite con los mejores programadores Java en la comunidad MEGA DEVS.
                </p>
            </div>

            <div className="data-table-card">
                {/* Podium Top 3 */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '2rem', padding: '2rem 1rem 1.5rem 1rem', background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-color)' }}>
                    {leaderboard.slice(0, 3).map((comp, idx) => {
                        const isFirst = comp.rank === 1;
                        return (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {isFirst && <div style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>👑</div>}
                                <div style={{
                                    width: isFirst ? '58px' : '46px',
                                    height: isFirst ? '58px' : '46px',
                                    borderRadius: '6px',
                                    background: 'var(--bg-surface)',
                                    border: `1px solid ${isFirst ? '#f59e0b' : 'var(--border-highlight)'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    color: 'var(--text-main)',
                                    marginBottom: '0.4rem'
                                }}>
                                    {comp.avatar}
                                </div>
                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{comp.name}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{comp.score} pts</span>
                                <div style={{
                                    width: '80px',
                                    height: isFirst ? '70px' : (comp.rank === 2 ? '55px' : '40px'),
                                    background: 'var(--bg-surface)',
                                    borderTop: `2px solid ${isFirst ? '#f59e0b' : 'var(--border-highlight)'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    color: 'var(--text-muted)',
                                    borderRadius: '6px 6px 0 0',
                                    marginTop: '0.5rem'
                                }}>
                                    {comp.rank}°
                                </div>
                            </div>
                        );
                    })}
                </div>

                <table className="devs-table">
                    <thead>
                        <tr>
                            <th>Posición</th>
                            <th>Programador</th>
                            <th>Problemas Resueltos</th>
                            <th>Envíos Totales</th>
                            <th>Efectividad</th>
                            <th>Puntaje Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((c) => (
                            <tr key={c.rank} style={{ background: c.isUser ? 'var(--bg-surface-hover)' : 'transparent' }}>
                                <td><strong>#{c.rank}</strong></td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'var(--bg-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>
                                            {c.avatar}
                                        </div>
                                        <span style={{ fontWeight: 700 }}>{c.name}</span>
                                    </div>
                                </td>
                                <td>{c.solved} ejercicios</td>
                                <td>{c.totalSubmissions} envíos</td>
                                <td>{c.effectiveness}</td>
                                <td><strong style={{ color: 'var(--text-main)' }}>{c.score} pts</strong></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
