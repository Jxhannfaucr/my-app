// src/App.js
import React, { useEffect, useState, useCallback  } from 'react';
import iconCr from './assets/img/0804.mp4';

function App() {
    //JS
    const [displayName, setDisplayName] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
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
            // Iniciar el parpadeo del cursor cuando se complete el nombre
            const cursorInterval = setInterval(() => {
                setShowCursor(prev => !prev);
            }, 500); // Cambia cada 500ms (0.5 segundos)
            return () => clearInterval(cursorInterval);
        }
    }, [displayName, typeUser, userName]);

    const videoClick = () => {
        const link = 'https://www.youtube.com/watch?v=Gzs60iBgd3E&pp=ygUPZHVraSBjb3N0YSByaWNh'
        window.open(link, '_blank');
    }

    return (
        <div className="App">
            <header>
                <img 
                    src="https://i.postimg.cc/8zLjrkWn/ftprofile.jpg" 
                    alt="Foto de perfil"
                    onClick={() => setShowPreview(true)}
                    style={{cursor: 'pointer'}}
                />
                
                <section className='headerName'>
                    <h1>{displayName}
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
            <div className='iconCr' onClick={videoClick}>
                <video autoPlay loop muted width={"5%"}>
                    <source src={iconCr} alt='Costa Rica' />
                </video>
            </div>

            {showPreview && (
                <div className="preview-modal" onClick={() => setShowPreview(false)}>
                    <img 
                        src="https://i.postimg.cc/8zLjrkWn/ftprofile.jpg" 
                        alt="Foto de perfil (ampliada)" 
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
            <div className='aboutMe'>
                21 years old, Systems engineer :D
            </div>

            <div className='knowledgesMe'>
                Languages and technologies
            </div>

            {/* CAROUSEL */}
            <div className="icon-cards">
                <div className="icon-cards__content">
                    <div className="icon-cards__item"><i className="fab fa-html5"></i></div>
                    <div className="icon-cards__item"><i className="fab fa-css3-alt"></i></div>
                    <div className="icon-cards__item"><i className="fab fa-js"></i></div>
                    <div className="icon-cards__item"><i className="fab fa-react"></i></div>
                    <div className="icon-cards__item"><i className="fab fa-python"></i></div>
                    
                </div>
            </div>

            <div className='contactMe'>
                About me
            </div>

            <div className='linksMe'>
            <a href="https://www.linkedin.com/in/johannfaucr/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/Jxhannfaucr" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
            </a>
            <a href="https://www.instagram.com/jxhann_faucr/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
            </a>
            <a href="https://music.apple.com/profile/Johann_faucr" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-apple"></i>
            </a>
            </div>

            {/* chatbot */}
            <div id="chat-btn" class="chat-btn" onclick="chatClick()">
                <div>
                    <div class="left-eye"></div>
                    <div class="mouth"></div>
                    <div class="right-eye"></div>
                </div>
            </div>
        </div>
    );
}

export default App;

