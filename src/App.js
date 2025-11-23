// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AboutMe from './components/AboutMe';
import TechCarousel from './components/TechCarousel';
import ContactMe from './components/ContactMe';
import SocialLinks from './components/SocialLinks';
import BtnBot from './components/BtnBot';
import ChatBot from './components/ChatBot';
import ImagePreview from './components/ImagePreview';

function App() {
    const [showPreview, setShowPreview] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            {/* Fondo animado */}
            <div className="background-container">
                <div className="curve-line"></div>
                <div className="curve-line"></div>
                <div className="curve-line"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="gradient-overlay"></div>
            </div>
            <div className="App">
                <Header 
                    onImageClick={() => setShowPreview(true)}
                    onMenuClick={() => setShowSidebar(true)}
                    isSidebarOpen={showSidebar}
                />
                
                <Sidebar 
                    isOpen={showSidebar}
                    onClose={() => setShowSidebar(false)}
                />
                
                {showPreview && (
                    <ImagePreview onClose={() => setShowPreview(false)} />
                )}
                
                <AboutMe />
                
                <TechCarousel />
                
                <ContactMe />
                
                <SocialLinks />
                
                {!showChat && <BtnBot onClick={() => setShowChat(true)} />}
                
                {showChat && <ChatBot onClose={() => setShowChat(false)} />}
            </div>
        </>
    );
}

export default App;