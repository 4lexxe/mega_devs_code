import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

export const CodeEditor = ({ code, setCode, onResetCode, onFormatCode }) => {
    const editorRef = useRef(null);
    const [editorLoaded, setEditorLoaded] = useState(false);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        setEditorLoaded(true);

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
                        documentation: 'Retorna el elemento en el tope de la Pila sin removerlo.',
                        detail: 'ELEMENT peek()',
                        range
                    },
                    {
                        label: 'empty',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: 'empty()',
                        documentation: 'Verifica si la Pila está vacía (retorna true o false).',
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
                        label: 'Stack<Integer>',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'Stack<Integer> ${1:pila} = new Stack<>();',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Crea una nueva pila genérica de Enteros (Stack<Integer>).',
                        detail: 'Instancia Stack<Integer>',
                        range
                    },
                    {
                        label: 'Stack<String>',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'Stack<String> ${1:pila} = new Stack<>();',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Crea una nueva pila genérica de Cadenas (Stack<String>).',
                        detail: 'Instancia Stack<String>',
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <div className="editor-topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-code)', fontSize: '0.85rem', color: 'var(--brand-java)' }}>
                    <i className="icon-doc-text" />
                    <span>Main.java</span>
                    <span style={{ fontSize: '0.72rem', background: 'var(--bg-surface-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '0.1rem 0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                        <i className="icon-magic" style={{ fontSize: '0.7rem' }} /> Autocompletado Activo
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="icon-btn" title="Restablecer plantilla inicial" onClick={onResetCode} style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer', padding: '0.3rem', borderRadius: '4px' }}>
                        <i className="icon-cw" />
                    </button>
                    <button className="icon-btn" title="Formatear código Java" onClick={onFormatCode} style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer', padding: '0.3rem', borderRadius: '4px' }}>
                        <i className="icon-magic" />
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, position: 'relative', background: '#1e1e1e' }}>
                <Editor
                    height="100%"
                    defaultLanguage="java"
                    theme="vs-dark"
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
