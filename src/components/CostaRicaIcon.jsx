// src/components/CostaRicaIcon.jsx
import React from 'react';
import iconCr from '../assets/img/0804.mp4';

function CostaRicaIcon() {
    const videoClick = () => {
        const link = 'https://www.youtube.com/watch?v=Gzs60iBgd3E&pp=ygUPZHVraSBjb3N0YSByaWNh';
        window.open(link, '_blank');
    };

    return (
        <div className='iconCr' onClick={videoClick}>
            <video autoPlay loop muted width="5%">
                <source src={iconCr} alt='Costa Rica' />
            </video>
        </div>
    );
}

export default CostaRicaIcon;