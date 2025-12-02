// src/components/TableOfContents.jsx
import React from 'react';

function TableOfContents({ sections, activeSection }) {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <aside className="table-of-contents">
            <div className="toc-container">
                <h3 className="toc-title">Tabla de contenido</h3>
                <nav className="toc-nav">
                    {sections.map((section, index) => (
                        <button
                            key={index}
                            className={`toc-item ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(section.id)}
                        >
                            <span className="toc-number">{String(index + 1).padStart(2, '0')}</span>
                            <span className="toc-text">{section.title}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}

export default TableOfContents;