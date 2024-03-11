import React from 'react';

export default function Select({ label, name, value, options, onChange }) {
    const id = Math.random().toString(36).substring(7);

    return (
        <>
            <label className="form-check-label" htmlFor={id}>
                {label}
            </label>

            <select className='form-control mt-1 mb-3' name={name} onChange={onChange} value={value}>
                <option value="" disabled>{label}</option>

                {options.map((option, index) => (
                    <option key={index} value={option.id}>
                        {option.title}
                    </option>
                ))}
            </select>
        </>
    );
}
