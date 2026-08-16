import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/**
 * Markdown & LaTeX Renderer Component using react-markdown, remark-math, and rehype-katex
 * Properly renders markdown lists, bold formatting, inline code, and KaTeX math formulas ($...$ and $$...$$).
 */
export const MarkdownLatexRenderer = ({ content }) => {
    if (!content) return null;

    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
