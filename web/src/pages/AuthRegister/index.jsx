import React, { useState, useEffect } from "react"
import axios from 'axios';
import { isLogged } from "../../utils/auth";

export default function Home() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (isLogged())
            window.location.href = '/'
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = import.meta.env.VITE_APP_API_URL
            const response = await axios.post(`${url}/auth/register`, { email, name, password })

            if (response) {
                alert('Usuário cadastrado sucesso!')
                window.location.href = '/login'
            }
        } catch (error) {
            alert(error.response.data.message ?? 'Erro ao realizar requisição')
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Cadastre-se</button>
                Já possui login? <a href="/login">clique aqui</a>
            </form>
        </div>
    )
}