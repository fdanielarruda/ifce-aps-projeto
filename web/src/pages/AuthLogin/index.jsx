import React, { useState, useEffect } from "react"
import axios from 'axios';
import { isLogged } from "../../utils/auth";

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (isLogged())
            window.location.href = '/'
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = import.meta.env.VITE_APP_API_URL
            const response = await axios.post(`${url}/auth/login`, { email, password })

            if (response) {
                alert('Login realizado com sucesso')
                localStorage.setItem('token', response.data.token)

                window.location.href = '/'
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
                Não possui conta? <a href="/register">cadastre-se aqui</a>
            </form>
        </div>
    )
}