// src/pages/ProjectTemplate.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TableOfContents from '../components/TableOfContents';
import CodeBlock from '../components/CodeBlock';
import Sidebar from '../components/Sidebar';
import '../styles/project.css';

function ProjectTemplate({ 
    title, 
    subtitle,
    category,
    tags,
    sections 
}) {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = document.querySelectorAll('.project-section');
            let current = '';

            sectionElements.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleImageClick = (imageSrc) => {
        setPreviewImage(imageSrc);
        setShowPreview(true);
    };

    return (
        <div className="project-page">
            <Header 
                onImageClick={() => {}}
                onMenuClick={() => setShowSidebar(true)}
                isSidebarOpen={showSidebar}
            />

            <Sidebar 
                isOpen={showSidebar}
                onClose={() => setShowSidebar(false)}
            />

            <div className="project-container">
                {/* Botón de regresar */}
                <button className="back-button" onClick={() => navigate('/')}>
                    <i className="fas fa-arrow-left"></i> Back to Home
                </button>

                <div className="project-content-wrapper">
                    {/* Tabla de contenidos lateral */}
                    <TableOfContents 
                        sections={sections} 
                        activeSection={activeSection}
                    />

                    {/* Contenido principal */}
                    <main className="project-main">
                        {/* Header del proyecto */}
                        <header className="project-header">
                            <span className="project-category">{category}</span>
                            <h1 className="project-title">{title}</h1>
                            <p className="project-subtitle">{subtitle}</p>
                            <div className="project-tags">
                                {tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                        </header>

                        {/* Secciones del proyecto */}
                        {sections.map((section, index) => (
                            <section 
                                key={index}
                                id={section.id}
                                className="project-section"
                            >
                                <h2 className="section-titleProject">{section.titleProject}</h2>
                                
                                {section.content.map((item, idx) => {
                                    switch (item.type) {
                                        case 'text':
                                            return <p key={idx} className="section-text">{item.value}</p>;
                                        
                                        case 'subtitle':
                                            return <h3 key={idx} className="section-subtitle">{item.value}</h3>;
                                        
                                        case 'list':
                                            return (
                                                <ul key={idx} className="section-list">
                                                    {item.items.map((listItem, i) => (
                                                        <li key={i}>{listItem}</li>
                                                    ))}
                                                </ul>
                                            );
                                        
                                        case 'code':
                                            return (
                                                <CodeBlock 
                                                    key={idx}
                                                    code={item.value}
                                                    language={item.language}
                                                />
                                            );
                                        
                                        case 'image':
                                            return (
                                                <figure key={idx} className="section-image">
                                                    <img 
                                                        src={item.src} 
                                                        alt={item.alt}
                                                        onClick={() => handleImageClick(item.src)}
                                                    />
                                                    {item.caption && (
                                                        <figcaption>{item.caption}</figcaption>
                                                    )}
                                                </figure>
                                            );
                                        
                                        case 'quote':
                                            return (
                                                <blockquote key={idx} className="section-quote">
                                                    {item.value}
                                                </blockquote>
                                            );
                                        
                                        default:
                                            return null;
                                    }
                                })}
                            </section>
                        ))}
                    </main>
                </div>
            </div>

            {/* Modal de preview de imagen */}
            {showPreview && (
                <div className="image-preview-modal" onClick={() => setShowPreview(false)}>
                    <img 
                        src={previewImage} 
                        alt="Preview" 
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button className="close-preview" onClick={() => setShowPreview(false)}>
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProjectTemplate;