import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

export const CodeEditor = ({ code, setCode, onResetCode, onFormatCode, language = 'java', theme = 'dark' }) => {
    const editorRef = useRef(null);
    const [editorLoaded, setEditorLoaded] = useState(false);

    const isPython = language === 'python' || (!code.includes('class Main') && !code.includes('public class') && (code.includes('print(') || code.includes('import ') || code.includes('input(')));

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        setEditorLoaded(true);

        // Define Hacker Cyan Celeste Dark Theme
        monaco.editor.defineTheme('hacker-cyan-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'keyword', foreground: '00f0ff', fontStyle: 'bold' },
                { token: 'keyword.java', foreground: '00e5ff', fontStyle: 'bold' },
                { token: 'keyword.python', foreground: '00e5ff', fontStyle: 'bold' },
                { token: 'type', foreground: '38bdf8', fontStyle: 'bold' },
                { token: 'identifier', foreground: 'e2e8f0' },
                { token: 'string', foreground: '00ff9d' },
                { token: 'number', foreground: '7dd3fc' },
                { token: 'comment', foreground: '475569', fontStyle: 'italic' },
                { token: 'delimiter', foreground: '38bdf8' },
                { token: 'operator', foreground: '00e5ff' }
            ],
            colors: {
                'editor.background': '#090d16',
                'editor.foreground': '#e2e8f0',
                'editor.lineHighlightBackground': '#131c2e',
                'editorCursor.foreground': '#00f0ff',
                'editorLineNumber.foreground': '#2563eb',
                'editorLineNumber.activeForeground': '#00f0ff',
                'editorSelection.background': '#00f0ff33',
                'editor.selectionHighlightBackground': '#00f0ff22',
                'editorIndentGuide.background': '#1e293b',
                'editorIndentGuide.activeBackground': '#38bdf8'
            }
        });

        // Define Hacker Cyan Celeste Light Theme
        monaco.editor.defineTheme('hacker-cyan-light', {
            base: 'vs',
            inherit: true,
            rules: [
                { token: 'keyword', foreground: '0284c7', fontStyle: 'bold' },
                { token: 'type', foreground: '0369a1', fontStyle: 'bold' },
                { token: 'identifier', foreground: '0f172a' },
                { token: 'string', foreground: '059669' },
                { token: 'number', foreground: '0284c7' },
                { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
                { token: 'delimiter', foreground: '0284c7' },
                { token: 'operator', foreground: '0284c7' }
            ],
            colors: {
                'editor.background': '#f0f7ff',
                'editor.foreground': '#0f172a',
                'editor.lineHighlightBackground': '#e0f2fe',
                'editorCursor.foreground': '#0284c7',
                'editorLineNumber.foreground': '#94a3b8',
                'editorLineNumber.activeForeground': '#0284c7',
                'editorSelection.background': '#38bdf833',
                'editorIndentGuide.background': '#cbd5e1',
                'editorIndentGuide.activeBackground': '#0284c7'
            }
        });

        // Set active theme dynamically
        monaco.editor.setTheme(theme === 'light' ? 'hacker-cyan-light' : 'hacker-cyan-dark');

        // Register custom Python completion suggestions
        monaco.languages.registerCompletionItemProvider('python', {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };

                const suggestions = [
                    {
                        label: 'print',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'print(${1:output})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Imprime una línea en la consola de salida en Python.',
                        detail: 'print()',
                        range
                    },
                    {
                        label: 'input',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'input().strip()',
                        documentation: 'Lee una línea de texto de la entrada estándar.',
                        detail: 'input()',
                        range
                    },
                    {
                        label: 'int(input())',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'int(input().strip())',
                        documentation: 'Lee un entero de la entrada estándar.',
                        detail: 'int(input())',
                        range
                    },
                    {
                        label: 'sys.stdin.read',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'import sys\n\ndatos = sys.stdin.read().split()',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Lee todos los tokens de la entrada estándar.',
                        detail: 'Lectura masiva en Python',
                        range
                    },
                    {
                        label: 'for in range',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'for ${1:i} in range(${2:1}, ${3:6}):\n    ${4:pass}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Bucle for usando range().',
                        detail: 'for i in range(...)',
                        range
                    }
                ];

                return { suggestions };
            }
        });

        // Register custom Java completion suggestions for Stack structure & standard Java IO
        monaco.languages.registerCompletionItemProvider('java', {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };

                const suggestions = [
                    {
                        label: 'push',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: 'push(${1:element});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Inserta un elemento en el tope de la Pila (Stack).',
                        detail: 'ELEMENT push(ELEMENT element)',
                        range
                    },
                    {
                        label: 'pop',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: 'pop()',
                        documentation: 'Remueve y retorna el elemento en el tope de la Pila.',
                        detail: 'ELEMENT pop()',
                        range
                    },
                    {
                        label: 'peek',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: 'peek()',
                        documentation: 'Examina el elemento en el tope de la Pila sin removerlo.',
                        detail: 'ELEMENT peek()',
                        range
                    },
                    {
                        label: 'empty',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: 'empty()',
                        documentation: 'Verifica si la Pila está vacía.',
                        detail: 'boolean empty()',
                        range
                    },
                    {
                        label: 'search',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: 'search(${1:objeto});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Retorna la posición 1-based del objeto contado desde el tope (-1 si no está).',
                        detail: 'int search(Object object)',
                        range
                    },
                    {
                        label: 'size',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: 'size()',
                        documentation: 'Retorna la cantidad actual de elementos en la Pila.',
                        detail: 'int size()',
                        range
                    },
                    {
                        label: 'Stack declaration',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'Stack<${1:Integer}> ${2:pila} = new Stack<>();',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Declaración e instanciación de una Pila en Java.',
                        detail: 'Stack<T> stack = new Stack<>()',
                        range
                    },
                    {
                        label: 'sout',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'System.out.println(${1:output});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Imprime una línea en la consola de salida (System.out.println).',
                        detail: 'System.out.println()',
                        range
                    },
                    {
                        label: 'Scanner',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'Scanner sc = new Scanner(System.in);',
                        documentation: 'Inicializa un objeto Scanner para leer datos de la entrada estándar.',
                        detail: 'Scanner sc = new Scanner(System.in)',
                        range
                    }
                ];

                return { suggestions };
            }
        });
    };

    const [copiedToast, setCopiedToast] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2000);
    };

    const handleUndo = () => {
        if (editorRef.current) {
            editorRef.current.trigger('keyboard', 'undo', null);
        }
    };

    const handleRedo = () => {
        if (editorRef.current) {
            editorRef.current.trigger('keyboard', 'redo', null);
        }
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen?.().catch(() => {});
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.().catch(() => {});
            setIsFullscreen(false);
        }
    };

    return (
        <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: 'var(--bg-surface)' }}>
            <div className="editor-topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-code)', fontSize: '0.82rem', flexWrap: 'wrap' }}>
                    <span className="hacker-status-dot" title="Cyber IDE Activo" />
                    <i className={isPython ? "icon-code" : "icon-doc-text"} style={{ color: 'var(--brand-cyan)' }} />
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{isPython ? 'solution.py' : 'Main.java'}</span>
                    <span className="hacker-cyber-badge">
                        <i className="icon-magic" style={{ fontSize: '0.68rem', color: '#00f0ff' }} /> Hacker IDE ({isPython ? 'Python 3' : 'Java 17'})
                    </span>
                    {copiedToast && (
                        <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '0.1rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                            ✓ ¡Código Copiado!
                        </span>
                    )}
                </div>

                {/* OC Editor Enhanced Toolbar */}
                <div className="editor-action-tools">
                    <button className="icon-btn" title="Copiar Código" onClick={handleCopyCode}>
                        <i className="icon-docs" />
                    </button>
                    <button className="icon-btn" title="Deshacer (Ctrl+Z)" onClick={handleUndo}>
                        <i className="icon-reply" />
                    </button>
                    <button className="icon-btn" title="Rehacer (Ctrl+Y)" onClick={handleRedo}>
                        <i className="icon-forward" />
                    </button>
                    <button className="icon-btn" title="Pantalla Completa" onClick={toggleFullscreen}>
                        <i className="icon-resize-full" />
                    </button>
                    <button className="icon-btn" title="Restablecer código inicial" onClick={onResetCode}>
                        <i className="icon-cw" />
                    </button>
                    <button className="icon-btn" title={isPython ? "Formatear Python" : "Formatear Java"} onClick={onFormatCode}>
                        <i className="icon-magic" />
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, position: 'relative', background: theme === 'light' ? '#f0f7ff' : '#090d16' }}>
                <Editor
                    height="100%"
                    language={isPython ? 'python' : 'java'}
                    theme={theme === 'light' ? 'hacker-cyan-light' : 'hacker-cyan-dark'}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    onMount={handleEditorDidMount}
                    options={{
                        fontSize: 14,
                        fontFamily: 'var(--font-code), "Fira Code", Consolas, monospace',
                        minimap: { enabled: false },
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        tabSize: 4,
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: { other: true, comments: true, strings: true },
                        snippetSuggestions: 'top',
                        wordBasedSuggestions: true,
                        renderLineHighlight: 'all',
                        lineNumbers: 'on',
                        folding: true,
                        cursorBlinking: 'smooth',
                        smoothScrolling: true
                    }}
                />
            </div>
        </div>
    );
};
