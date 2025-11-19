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
            { name: '"Sano y Fresco": Comprehensive Data Science Strategy to Reverse E-commerce Sales Decline', link: '#', description: 'SQL, Power BI, and Python workflow to recover e-commerce sales.' }
        ],
        webDeveloper: [
            { name: 'Adding..', link: '#', description: 'Adding..' }
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
                    {/* Sección About Me */}
                    <div className="sidebar-section">
                        <button 
                            className={`section-header ${expandedSection === 'about' ? 'active' : ''}`}
                            onClick={() => toggleSection('about')}
                        >
                            <span className="section-icon">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                            <span className="section-title">About Me</span>
                            <span className={`arrow ${expandedSection === 'about' ? 'rotated' : ''}`}>›</span>
                        </button>
                        
                        <div className={`section-content ${expandedSection === 'about' ? 'expanded' : ''}`}>
                            <div className="about-content">
                                <div className="about-item">
                                    <div className="about-label">🎓 Education</div>
                                    <div className="about-text">Autonomous University of Central America (UACA)</div>
                                    <div className="about-text small">Systems Engineer</div>
                                    <div className="about-text">Technological Institute of Costa Rica (TEC)</div>
                                    <div className="about-text small">Data Analyst Program</div>
                                </div>

                                <div className="about-item">
                                    <div className="about-label">💼 Experience</div>
                                    <div className="about-text">Backend Developer at <a href="https://www.linkedin.com/company/elva-sa/" target="_blank" rel="noopener noreferrer" style={{ color: "#0ea224ff" }}>ELVA</a></div>
                                    <div className="about-text small">Python • FastAPI • GCP (1 year)</div>
                                </div>

                                <div className="about-item">
                                    <div className="about-label">🛠️ Skills</div>
                                    <div className="skill-tags">
                                        <span className="skill-tag">Python</span>
                                        <span className="skill-tag">SQL</span>
                                        <span className="skill-tag">Power BI</span>
                                        <span className="skill-tag">GCP</span>
                                        <span className="skill-tag">React</span>
                                    </div>
                                </div>

                                <div className="about-item">
                                    <div className="about-label">📜 Certification</div>
                                    <div className="about-text">Google Data Analytics Professional</div>
                                </div>

                                <a 
                                    href="https://drive.google.com/uc?export=download&id=1MoVzU6CeuBQhtRVjXAQEoQ6vUWYhxpn_" 
                                    className="download-cv-btn"
                                    target="_self"
                                >
                                    <i className="fas fa-download"></i> Download Full CV
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
                                <i className="fa fa-code" aria-hidden="true"></i>
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