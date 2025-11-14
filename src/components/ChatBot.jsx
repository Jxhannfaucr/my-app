// src/components/ChatBot.jsx
import React from 'react';
import '../styles/ChatBot.css';

function ChatBot({ onClose }) {
    return (
        <div>
            <div class="card-container">
                <div class="card-header">
                    <div class="img-avatar"></div>
                    <div class="text-chat">Chat</div>
                    <button 
                        onClick={onClose} 
                        style={{
                            marginLeft: 'auto',
                            background: 'none',
                            border: 'none',
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: '#333'
                        }}
                    >
                        ✕
                    </button>
                </div>
                <div class="card-body">
                    <div class="messages-container">
                        <div class="message-box left">
                            <p>Hello, How are you?</p>
                        </div>
                        <div class="message-box right">
                            <p>I'm good, thanks for asking! How about you?</p>
                        </div>
                    </div>
                    <div class="message-input">
                    <form>
                        <textarea placeholder="Type your message here" class="message-send"></textarea>
                        <button type="submit" class="button-send">Send</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
     
    );
}

export default ChatBot;