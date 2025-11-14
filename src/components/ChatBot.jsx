// src/components/ChatBot.jsx
import React from 'react';

function ChatBot() {
    const chatClick = () => {
        // Aquí puedes agregar la lógica del chatbot
        console.log('Chat clicked!');
    };

    return (
        <div 
            id="chat-btn" 
            className="chat-btn" 
            onClick={chatClick}
        >
            <div>
                <div className="left-eye"></div>
                <div className="mouth"></div>
                <div className="right-eye"></div>
            </div>
        </div>
    );
}

export default ChatBot;