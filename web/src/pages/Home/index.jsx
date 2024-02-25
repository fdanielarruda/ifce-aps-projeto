import React, { useState, useEffect } from "react"
import { getAuth } from '../../utils/auth'

export default function Home() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        const token = getAuth()

        if (token) {
            setEmail(token.user.email)
            setName(token.user.name)
        }
    }, [])

    return (
        <div>
            <h2>Seja, bem-vindo!</h2>
            <p>Seu email: {email}</p>
            <p>Seu nome: {name}</p>

            <button
                onClick={() => {
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                }}
            >
                Sair
            </button>
        </div>
    )
}