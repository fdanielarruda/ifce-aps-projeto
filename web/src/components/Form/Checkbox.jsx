import React from 'react';

export default function Checkbox({ label, name, type, value, onClick }) {
    const id = Math.random().toString(36).substring(7);

    return (
        <>
            <div className="form-check mb-3">
                <input
                    className="form-check-input"
                    type={type}
                    id={id}
                    name={name}
                    onClick={onClick}
                    defaultChecked={value}
                />
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            </div>
        </>
    );
}
