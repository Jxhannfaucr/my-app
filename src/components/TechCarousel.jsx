// src/components/TechCarousel.jsx
import React from 'react';

function TechCarousel() {
    const technologies = [
        { icon: 'fab fa-html5', name: 'HTML5' },
        { icon: 'fab fa-css3-alt', name: 'CSS3' },
        { icon: 'fab fa-js', name: 'JavaScript' },
        { icon: 'fab fa-react', name: 'React' },
        { icon: 'fab fa-python', name: 'Python' }
    ];

    return (
        <>
            <div className='knowledgesMe'>
                Languages and technologies
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