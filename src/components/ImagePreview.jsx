// src/components/ImagePreview.jsx
import React from 'react';

function ImagePreview({ onClose }) {
    return (
        <div className="preview-modal" onClick={onClose}>
            <img 
                src="https://i.postimg.cc/8zLjrkWn/ftprofile.jpg" 
                alt="Foto de perfil (ampliada)" 
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
}

export default ImagePreview;