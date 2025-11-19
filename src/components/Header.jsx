// src/components/Header.jsx
import React, { useEffect, useState, useCallback } from 'react';

function Header({ onImageClick, onMenuClick, isSidebarOpen }) {
    const [displayName, setDisplayName] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const userName = "Johan Zúñiga";

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
            <section className='headerMenu'>
                <label 
                    className="buttons__burger" 
                    onClick={onMenuClick} 
                    style={{cursor: 'pointer'}}
                >
                    <input 
                        type="checkbox" 
                        id="burger" 
                        checked={isSidebarOpen}
                        readOnly
                    />
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </section>
            
            <section className='headerName'>
                <h1>
                    {displayName}
                    <span style={{
                        opacity: showCursor ? 1 : 0,
                        transition: 'opacity 0.1s',
                        borderRight: '3px solid rgba(255, 255, 255, 0.3)',
                        paddingRight: '3px',
                    }}>
                    </span>
                </h1>
            </section>

            <img 
                src="https://i.postimg.cc/8zLjrkWn/ftprofile.jpg" 
                alt="Foto de perfil"
                onClick={onImageClick}
                style={{cursor: 'pointer'}}
            />
        </header>
    );
}

export default Header;