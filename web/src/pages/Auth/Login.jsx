import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react"
import axios from 'axios';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import TextLink from '../../components/Utils/TextLink';
import Page from '../../components/Template/Page';

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        <Page window="mini" auth={false}>
            <Form>
                <Input
                    type="email"
                    label="Nome"
                    name="name"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    label="Senha"
                    name="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    text="Entrar"
                    type="submit"
                    onClick={handleSubmit}                
                />

                Não possui conta? <TextLink text="cadastre-se aqui" url="/register" />
            </Form>
        </Page>
    )
}