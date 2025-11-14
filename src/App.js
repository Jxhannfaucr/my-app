// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import CostaRicaIcon from './components/CostaRicaIcon';
import AboutMe from './components/AboutMe';
import TechCarousel from './components/TechCarousel';
import ContactMe from './components/ContactMe';
import SocialLinks from './components/SocialLinks';
import BtnBot from './components/BtnBot';
import ImagePreview from './components/ImagePreview';
import ChatBot from './components/ChatBot';

function App() {
    const [showPreview, setShowPreview] = useState(false);
    const [showChat, setShowChat] = useState(false);

    return (
        <div className="App">
            <Header onImageClick={() => setShowPreview(true)} />
            
            <CostaRicaIcon />
            
            {showPreview && (
                <ImagePreview onClose={() => setShowPreview(false)} />
            )}
            
            <AboutMe />
            
            <TechCarousel />
            
            <ContactMe />
            
            <SocialLinks />
            

            {/* CHATBOT */}
            {/* 👇 Mostrar botón solo cuando el chat está cerrado */}
            {!showChat && <BtnBot onClick={() => setShowChat(true)} />}
            
            {/* 👇 Mostrar chat solo cuando está abierto */}
            {showChat && <ChatBot onClose={() => setShowChat(false)} />}
        </div>
    );
}

export default App;