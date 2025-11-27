// src/components/CodeBlock.jsx
import React, { useState } from 'react';

function CodeBlock({ code, language = 'python' }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="code-block">
            <div className="code-header">
                <span className="code-language">{language}</span>
                <button className="copy-button" onClick={copyToClipboard}>
                    {copied ? (
                        <>
                            <i className="fas fa-check"></i> Copied!
                        </>
                    ) : (
                        <>
                            <i className="fas fa-copy"></i> Copy
                        </>
                    )}
                </button>
            </div>
            <pre className="code-content">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export default CodeBlock;