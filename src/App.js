// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import CostaRicaIcon from './components/CostaRicaIcon';
import AboutMe from './components/AboutMe';
import TechCarousel from './components/TechCarousel';
import ContactMe from './components/ContactMe';
import SocialLinks from './components/SocialLinks';
import ChatBot from './components/ChatBot';
import ImagePreview from './components/ImagePreview';

function App() {
    const [showPreview, setShowPreview] = useState(false);

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
            
            <ChatBot />
        </div>
    );
}

export default App;