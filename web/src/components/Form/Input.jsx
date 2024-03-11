import React from 'react'

export default function Input({ type, label, value, onChange, name }) {
    return (
        <>
            <label htmlFor=''>{label}</label>
            <input
                className='form-control mt-1 mb-3 col-12'
                type={type}
                placeholder={label}
                value={value}
                onChange={onChange}
                name={name}
            />
        </>
    )
}