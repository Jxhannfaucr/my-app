// src/components/Sidebar.jsx
import React, { useState } from 'react';
import '../styles/sidebar.css';

function Sidebar({ isOpen, onClose }) {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const projects = {
        dataAnalysis: [
            { name: 'Análisis de Ventas', link: '#', description: 'Dashboard interactivo' },
            { name: 'Predicción de Demanda', link: '#', description: 'Machine Learning' },
            { name: 'Visualización COVID-19', link: '#', description: 'Python & Plotly' },
        ],
        webDeveloper: [
            { name: 'E-commerce Platform', link: '#', description: 'React + Node.js' },
            { name: 'Portfolio Personal', link: '#', description: 'React + TailwindCSS' },
            { name: 'Task Manager App', link: '#', description: 'MERN Stack' },
        ]
    };

    return (
        <>
            {/* Overlay oscuro */}
            <div 
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* Header del Sidebar */}
                <div className="sidebar-header">
                    <h2>Portfolio</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Contenido del Sidebar */}
                <div className="sidebar-content">
                    {/* Sección Data Analysis */}
                    <div className="sidebar-section">
                        <button 
                            className={`section-header ${expandedSection === 'data' ? 'active' : ''}`}
                            onClick={() => toggleSection('data')}
                        >
                            <span className="section-icon">
                                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                            </span>
                            <span className="section-title">Data Analysis</span>
                            <span className={`arrow ${expandedSection === 'data' ? 'rotated' : ''}`}>›</span>
                        </button>
                        
                        <div className={`section-content ${expandedSection === 'data' ? 'expanded' : ''}`}>
                            {projects.dataAnalysis.map((project, index) => (
                                <a 
                                    key={index} 
                                    href={project.link} 
                                    className="project-item"
                                    onClick={onClose}
                                >
                                    <div className="project-name">{project.name}</div>
                                    <div className="project-description">{project.description}</div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Sección Web Developer */}
                    <div className="sidebar-section">
                        <button 
                            className={`section-header ${expandedSection === 'web' ? 'active' : ''}`}
                            onClick={() => toggleSection('web')}
                        >
                            <span className="section-icon">
                                <i class="fa fa-code" aria-hidden="true"></i>
                            </span>
                            <span className="section-title">Web Developer</span>
                            <span className={`arrow ${expandedSection === 'web' ? 'rotated' : ''}`}>›</span>
                        </button>
                        
                        <div className={`section-content ${expandedSection === 'web' ? 'expanded' : ''}`}>
                            {projects.webDeveloper.map((project, index) => (
                                <a 
                                    key={index} 
                                    href={project.link} 
                                    className="project-item"
                                    onClick={onClose}
                                >
                                    <div className="project-name">{project.name}</div>
                                    <div className="project-description">{project.description}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer del Sidebar */}
                <div className="sidebar-footer">
                    <p>Johan Zúñiga</p>
                    <p className="footer-subtitle">Systems Engineer</p>
                </div>
            </div>
        </>
    );
}

export default Sidebar;