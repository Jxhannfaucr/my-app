// src/components/SocialLinks.jsx
import React from 'react';

function SocialLinks() {
    const socialLinks = [
        {
            url: 'https://www.linkedin.com/in/johannfaucr/',
            icon: 'fab fa-linkedin',
            label: 'LinkedIn'
        },
        {
            url: 'https://github.com/Jxhannfaucr',
            icon: 'fab fa-github',
            label: 'GitHub'
        },
        {
            url: 'https://www.instagram.com/jxhann_faucr/',
            icon: 'fab fa-instagram',
            label: 'Instagram'
        },
        {
            url: 'https://music.apple.com/profile/Johann_faucr',
            icon: 'fab fa-apple',
            label: 'Apple Music'
        }
    ];

    return (
        <div className='linksMe'>
            {socialLinks.map((link, index) => (
                <a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={link.label}
                >
                    <i className={link.icon}></i>
                </a>
            ))}
        </div>
    );
}

export default SocialLinks;