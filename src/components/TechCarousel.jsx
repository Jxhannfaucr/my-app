// src/components/TechCarousel.jsx
import React from 'react';

function TechCarousel() {
const technologies = [
    { icon: 'fas fa-database', name: 'SQL' },
    { icon: 'fab fa-aws', name: 'AWS' },
    { icon: 'fab fa-react', name: 'React' },
    { icon: 'fas fa-chart-line', name: 'Pandas' },
    { icon: 'fab fa-python', name: 'Python' },
];

    return (
        <>
            <div className='knowledgesMe'>
                Lenguajes y tecnologías
            </div>

            <div className="icon-cards">
                <div className="icon-cards__content">
                    {technologies.map((tech, index) => (
                        <div className="icon-cards__item" key={index}>
                            <i className={tech.icon}></i>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TechCarousel;