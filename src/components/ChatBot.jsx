// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import sendMessageToGroq from '../services/groqIAService';
import avatar from '../assets/img/avatar_ftbot.PNG';
import Swal from 'sweetalert2';

function ChatBot({ onClose }) {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '¡Hola! Soy el asistente del Ingeniero Johan. ¿En qué puedo ayudarte?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll al último mensaje
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');

        // Agregar mensaje del usuario
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            // Preparar historial para el contexto
            const conversationHistory = messages.map(msg => ({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                content: msg.content
            }));

            // Llamar a la IA
            const aiResponse = await sendMessageToGroq(userMessage, conversationHistory);

            // Agregar respuesta de la IA
            setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
        } catch (error) {
            setMessages([...newMessages, { 
                role: 'assistant', 
                content: 'Disculpa, hubo un error. Intenta de nuevo.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="card-container">
            <div className="card-header">
                <div className="img-avatar">
                    <img 
                        src={avatar}
                        alt="Avatar Johan" 
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                    />
                </div>
                <h3 className="text-chat">Chat Bot</h3>
                <button 
                    onClick={() => {
                        Swal.fire({
                            title: "¿Cerrar chat?",
                            text: "¿Estás seguro de que querés cerrar la conversación?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Sí, cerrar",
                            confirmButtonColor: 'rgba(1, 1, 1, 0.51)',
                            cancelButtonText: "Cancelar",
                            reverseButtons: true,
                            background: 'rgba(73, 73, 73, 0.51)',
                            backdrop: 'rgba(0, 0, 0, 0.7)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            customClass: {
                                popup: 'swal-liquid-glass swal-custom-font',
                                confirmButton: 'swal-btn-confirm',
                                cancelButton: 'swal-btn-cancel'
                            },
                        }).then((result) => {
                            if (result.isConfirmed) {
                                onClose();
                            }
                        });
                    }}
                    style={{
                        marginLeft: 'auto',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        fontSize: '20px',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        color: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    ✕
                </button>
            </div>
            
            <div className="card-body">
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`message-box ${msg.role === 'user' ? 'right' : 'left'}`}
                        >
                            {msg.content}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message-box left">
                            <span className="typing-indicator">●●●</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            
            <div className="message-input">
                <textarea 
                    className="message-send" 
                    placeholder="Escribe un mensaje..."
                    rows="2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                ></textarea>
                <button 
                    className="button-send"
                    onClick={handleSend}
                    disabled={isLoading}
                >
                    {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>
        </div>
    );
}

export default ChatBot;