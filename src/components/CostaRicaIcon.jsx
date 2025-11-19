// src/components/CostaRicaIcon.jsx
import React from 'react';
import iconCr from '../assets/img/0804.mp4';

function CostaRicaIcon() {
    return (
        <div className='iconCr'>
            <video autoPlay loop muted width="5%">
                <source src={iconCr} alt='Costa Rica' />
            </video>
        </div>
    );
}

export default CostaRicaIcon;