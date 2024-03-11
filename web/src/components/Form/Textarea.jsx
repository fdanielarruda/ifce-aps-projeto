import React from 'react'

export default function Textarea({ label, value, onChange, name }) {
    const id = Math.random().toString(36).substring(7);

    return (
        <>
            <label htmlFor={id}>
                {label}
            </label>

            <textarea
                id={id}
                className='form-control mt-1 mb-3 col-12'
                placeholder={label}
                value={value}
                onChange={onChange}
                name={name}
            />
        </>
    )
}