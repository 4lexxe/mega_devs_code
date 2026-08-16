import React, { useState } from 'react';

export const ProblemCreator = ({ onCreateProblem }) => {
    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState('Fácil');
    const [points, setPoints] = useState(100);
    const [category, setCategory] = useState('JAVA -> ARREGLOS');
    const [sectionTitle, setSectionTitle] = useState('Sección 1: Operaciones Básicas');
    const [timeLimit, setTimeLimit] = useState(1.0);
    const [memoryLimit, setMemoryLimit] = useState(32);
    const [description, setDescription] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const [outputDesc, setOutputDesc] = useState('');
    const [starterCode, setStarterCode] = useState(`import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Tu código Java aquí\n    }\n}`);
    const [auxiliaryFilename, setAuxiliaryFilename] = useState('');
    const [auxiliaryCode, setAuxiliaryCode] = useState('');
    const [sampleIn, setSampleIn] = useState('');
    const [sampleOut, setSampleOut] = useState('');
    const [secretIn, setSecretIn] = useState('');
    const [secretOut, setSecretOut] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProblem = {
            title,
            difficulty,
            category,
            sectionTitle: sectionTitle || 'Sección General',
            tags: [category, "Personalizado"],
            points: parseInt(points, 10),
            timeLimit: parseFloat(timeLimit),
            memoryLimit: parseInt(memoryLimit, 10),
            description: description,
            inputDesc,
            outputDesc,
            constraints: ["1 <= Entradas <= 1000"],
            hints: [{ title: "Ejercicio Creado", content: "Valida la entrada System.in adecuadamente." }],
            examples: [{ input: sampleIn, output: sampleOut }],
            testcases: [
                { input: sampleIn, expectedOutput: sampleOut, isSample: true },
                { input: secretIn || sampleIn, expectedOutput: secretOut || sampleOut, isSample: false }
            ],
            starterCode,
            auxiliaryFilename: auxiliaryFilename.trim() || null,
            auxiliaryCode: auxiliaryCode.trim() || null
        };

        const res = await onCreateProblem(newProblem);
        if (res) {
            alert(`¡El ejercicio '${title}' ha sido publicado e integrado con éxito a la base de datos MEGA DEVS!`);
            setTitle('');
            setDescription('');
            setInputDesc('');
            setOutputDesc('');
            setSampleIn('');
            setSampleOut('');
            setSecretIn('');
            setSecretOut('');
            setAuxiliaryFilename('');
            setAuxiliaryCode('');
        }
    };

    return (
        <div className="view-page">
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.6rem', fontFamily: 'var(--font-straight)' }}>
                    <i className="icon-plus-circled" style={{ color: 'var(--text-main)', fontSize: '1.6rem' }} />
                    <span>Crear Nuevo Ejercicio en Java</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Diseña un problema algorítmico, define su sección en el catálogo y proporciona estructuras auxiliares si es necesario (ej. Stack.java).
                </p>
            </div>

            <div className="data-table-card" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Título del Ejercicio *</label>
                            <input
                                type="text"
                                required
                                placeholder="Ej: Operaciones con Pila (Inversión y Sin Repetidos)"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem', color: '#fff', outline: 'none' }}
                            />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Dificultad *</label>
                            <select className="select-dropdown" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                <option value="Fácil">Fácil</option>
                                <option value="Medio">Medio</option>
                                <option value="Difícil">Difícil</option>
                            </select>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Puntos *</label>
                            <input
                                type="number"
                                required
                                value={points}
                                onChange={(e) => setPoints(e.target.value)}
                                style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem', color: '#fff', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Categoría *</label>
                            <select className="select-dropdown" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="JAVA -> ARREGLOS">JAVA -&gt; ARREGLOS</option>
                                <option value="JAVA -> ARRAYLIST">JAVA -&gt; ARRAYLIST</option>
                                <option value="JAVA -> PILAS STACK">JAVA -&gt; PILAS STACK</option>
                            </select>
                        </div>
                        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <i className="icon-layers" style={{ color: 'var(--text-muted)' }} /> Sección / Título de Separador en Catálogo *
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Ej: Sección 1: Operaciones Básicas"
                                value={sectionTitle}
                                onChange={(e) => setSectionTitle(e.target.value)}
                                style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem', color: '#fff', outline: 'none' }}
                            />
                        </div>
                        <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Tiempo (s)</label>
                            <input type="number" step="0.1" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem', color: '#fff', outline: 'none' }} />
                        </div>
                        <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Memoria (MB)</label>
                            <input type="number" value={memoryLimit} onChange={(e) => setMemoryLimit(e.target.value)} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem', color: '#fff', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Descripción / Enunciado (Markdown & LaTeX $...$) *</label>
                        <textarea
                            rows={4}
                            required
                            placeholder="Describe el problema utilizando markdown o fórmulas como $S = \\sum A_i^2$..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem', color: '#fff', outline: 'none', resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Especificación de Entrada *</label>
                            <textarea rows={2} required value={inputDesc} onChange={(e) => setInputDesc(e.target.value)} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem', color: '#fff', outline: 'none' }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Especificación de Salida *</label>
                            <textarea rows={2} required value={outputDesc} onChange={(e) => setOutputDesc(e.target.value)} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem', color: '#fff', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Plantilla Inicial (Main.java) *</label>
                        <textarea rows={5} value={starterCode} onChange={(e) => setStarterCode(e.target.value)} style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem', color: '#fff', fontFamily: 'var(--font-code)', fontSize: '0.85rem', outline: 'none' }} />
                    </div>

                    {/* Optional Auxiliary Class (Stack.java) */}
                    <div style={{ marginTop: '0.5rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-color)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem', color: 'var(--text-main)', fontFamily: 'var(--font-straight)' }}>
                            <i className="icon-doc-text" style={{ color: 'var(--text-muted)' }} /> Clase / Estructura Auxiliar (Opcional - ej. Stack.java)
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.2rem 0 0.6rem 0' }}>
                            Si el ejercicio requiere una clase personalizada (ej. <code>Stack.java</code>), especifica el nombre del archivo y su código fuente para que el Juez la compile automáticamente.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nombre de Archivo Auxiliar</label>
                            <input
                                type="text"
                                placeholder="Ej: Stack.java"
                                value={auxiliaryFilename}
                                onChange={(e) => setAuxiliaryFilename(e.target.value)}
                                style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', fontFamily: 'var(--font-code)' }}
                            />
                        </div>
                        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Código Fuente Auxiliar (Stack.java)</label>
                            <textarea
                                rows={4}
                                placeholder="public class Stack<ELEMENT> { ... }"
                                value={auxiliaryCode}
                                onChange={(e) => setAuxiliaryCode(e.target.value)}
                                style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', fontFamily: 'var(--font-code)', fontSize: '0.82rem' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '0.5rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-color)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem', color: 'var(--text-main)', fontFamily: 'var(--font-straight)' }}>
                            <i className="icon-ok-circled" style={{ color: 'var(--text-muted)' }} /> Casos de Prueba
                        </h3>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Entrada del Ejemplo</label>
                            <textarea rows={2} value={sampleIn} onChange={(e) => setSampleIn(e.target.value)} style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', fontFamily: 'var(--font-code)' }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Salida Esperada del Ejemplo</label>
                            <textarea rows={2} value={sampleOut} onChange={(e) => setSampleOut(e.target.value)} style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', fontFamily: 'var(--font-code)' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="submit" className="btn-devs btn-devs-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
                            <i className="icon-plus-circled" />
                            <span>Publicar Ejercicio en MEGA DEVS</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
