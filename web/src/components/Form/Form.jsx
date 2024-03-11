import React from 'react'

export default function Form({ children }) {
    return (
        <form className='form'>
            {children}
        </form>
    )
}