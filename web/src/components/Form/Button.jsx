import React from 'react';

export default function Button({ text, color = 'primary', type, onClick }) {
    return (
        <button 
            className={`btn btn btn-${color} col-12 mb-3`} 
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
}
