// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar({ isOpen, onClose }) {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const projects = {
        dataAnalysis: [
            { name: '"Sano y Fresco": Estrategia Integral de Data Science para Revertir la Caída de Ventas del E-commerce', link: '/project/ventas', description: 'Flujo de trabajo con SQL, Power BI y Python para recuperar ventas.' }
        ],
        webDeveloper: [
            { name: 'Agregando..', link: '#', description: 'Agregando..' }
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
                    <h2>Portafolio</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Contenido del Sidebar */}
                <div className="sidebar-content">
                    {/* Sección About Me */}
                    <div className="sidebar-section">
                        <button 
                            className={`section-header ${expandedSection === 'about' ? 'active' : ''}`}
                            onClick={() => toggleSection('about')}
                        >
                            <span className="section-icon">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                            <span className="section-title">Sobre Mí</span>
                            <span className={`arrow ${expandedSection === 'about' ? 'rotated' : ''}`}>›</span>
                        </button>
                        
                        <div className={`section-content ${expandedSection === 'about' ? 'expanded' : ''}`}>
                            <div className="about-content">
                                <div className="about-item">
                                    <div className="about-label">🎓 Educación</div>
                                    <div className="about-text">Universidad Autónoma de Centro América (UACA)</div>
                                    <div className="about-text small">Bachillerato de Ingeniería en Sistemas</div>
                                    <div className="about-text">Tecnológico de Costa Rica (TEC)</div>
                                    <div className="about-text small">Técnico de Analista de Datos</div>
                                </div>

                                <div className="about-item">
                                    <div className="about-label">💼 Experiencia</div>
                                    <div className="about-text">Desarrollador Backend en <a href="https://www.linkedin.com/company/elva-sa/" target="_blank" rel="noopener noreferrer" style={{ color: "#0ea224ff" }}>ELVA</a></div>
                                    <div className="about-text small">Python • FastAPI • GCP (1 año)</div>

                                    <div className="about-text">Líder de Datos e Infraestructura en <span style={{ color: "#0ea224ff" }}><a href='https://agrologos.co.cr/' target='_blank' rel='noopener noreferrer'>Almacén Agro Logos S.A</a></span></div>
                                    <div className="about-text small">SQL • Gestión IT • Normalización de Datos (Nov 2025 – Presente)</div>
                                </div>

                                <div className="about-item">
                                    <div className="about-label">🛠️ Habilidades</div>
                                    <div className="skill-tags">
                                        <span className="skill-tag">Python</span>
                                        <span className="skill-tag">SQL</span>
                                        <span className="skill-tag">Power BI</span>
                                        <span className="skill-tag">GCP</span>
                                        <span className="skill-tag">React</span>
                                    </div>
                                </div>

                                <div className="about-item">
                                    <div className="about-label">📜 Certificación</div>
                                    <div className="about-text">Google Data Analytics Professional</div>
                                </div>

                                <a 
                                    href="https://drive.google.com/uc?export=download&id=1a96fEQen6ABQ-YpcKBUE300K7xHqL13z"
                                    className="download-cv-btn"
                                    target="_self"
                                >
                                    <i className="fas fa-download"></i> Descargar CV Completo
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sección Data Analysis */}
                    <div className="sidebar-section">
                        <button 
                            className={`section-header ${expandedSection === 'data' ? 'active' : ''}`}
                            onClick={() => toggleSection('data')}
                        >
                            <span className="section-icon">
                                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                            </span>
                            <span className="section-title">Análisis de Datos</span>
                            <span className={`arrow ${expandedSection === 'data' ? 'rotated' : ''}`}>›</span>
                        </button>
                        
                        <div className={`section-content ${expandedSection === 'data' ? 'expanded' : ''}`}>
                            {projects.dataAnalysis.map((project, index) => (
                                <Link 
                                    key={index} 
                                    to={project.link} 
                                    className="project-item"
                                    onClick={onClose}
                                >
                                    <div className="project-name">{project.name}</div>
                                    <div className="project-description">{project.description}</div>
                                </Link>
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
                                <i className="fa fa-code" aria-hidden="true"></i>
                            </span>
                            <span className="section-title">Desarrollo Web</span>
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
                    <p className="footer-subtitle">Ingeniero en Sistemas</p>
                </div>
            </div>
        </>
    );
}

export default Sidebar;