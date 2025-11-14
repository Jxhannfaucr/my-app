// src/components/ChatBot.jsx
import React from 'react';
import '../styles/ChatBot.css';

function BtnBot({ onClick }) {
    return (
        <div 
            id="chat-btn" 
            className="chat-btn" 
            onClick={onClick}
        >
            <div>
                <div className="left-eye"></div>
                <div className="mouth"></div>
                <div className="right-eye"></div>
            </div>
        </div>
    );
}

export default BtnBot;