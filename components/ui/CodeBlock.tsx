import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript', title }) => {
  return (
    <div style={{
      background: 'var(--bg-secondary)', // #0e0e0f
      margin: '2rem 0',
      position: 'relative',
      ...({} as any)
    }}>
      {title && (
        <div className="technical-text" style={{
          padding: '1rem 2rem',
          background: 'var(--bg-primary)', // #131314
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          ...({} as any)
        }}>
          <span>{title}</span>
          <span style={{ opacity: 0.6 }}>{language}</span>
        </div>
      )}
      <pre style={{
        padding: '2rem',
        margin: 0,
        overflowX: 'auto',
        fontSize: '0.85rem',
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-technical)',
        ...({} as any)
      }}>
        <code>{code}</code>
      </pre>
      {/* Signature Texture */}
      <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '2px',
          height: '100%',
          background: 'var(--accent-primary)',
          opacity: 0.15,
          ...({} as any)
      }} />
    </div>
  );
};
