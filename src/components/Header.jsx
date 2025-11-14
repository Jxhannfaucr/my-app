// src/components/Header.jsx
import React, { useEffect, useState, useCallback } from 'react';

function Header({ onImageClick }) {
    const [displayName, setDisplayName] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const userName = "Jxhann_faucr";

    const typeUser = useCallback(() => {
        setDisplayName(prevName => {
            if (prevName.length < userName.length) {
                return userName.slice(0, prevName.length + 1);
            }
            return prevName;
        });
    }, [userName]);

    useEffect(() => {
        if (displayName.length < userName.length) {
            const timerId = setTimeout(typeUser, 160);
            return () => clearTimeout(timerId);
        } else {
            const cursorInterval = setInterval(() => {
                setShowCursor(prev => !prev);
            }, 500);
            return () => clearInterval(cursorInterval);
        }
    }, [displayName, typeUser, userName]);

    return (
        <header>
            <img 
                src="https://i.postimg.cc/8zLjrkWn/ftprofile.jpg" 
                alt="Foto de perfil"
                onClick={onImageClick}
                style={{cursor: 'pointer'}}
            />
            
            <section className='headerName'>
                <h1>
                    {displayName}
                    <span style={{
                        opacity: showCursor ? 1 : 0,
                        transition: 'opacity 0.1s',
                        borderRight: '3px solid #000',
                        paddingRight: '3px',
                    }}>
                    </span>
                </h1>
            </section>
            
            <section className='headerMenu'>
                <label className="hamburger">
                    <input type="checkbox" />
                    <svg viewBox="0 0 32 32">
                        <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                        <path className="line" d="M7 16 27 16" />
                    </svg>
                </label>
            </section>
        </header>
    );
}

export default Header;