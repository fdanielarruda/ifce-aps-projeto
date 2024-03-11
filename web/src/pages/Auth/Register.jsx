import React, { useState } from "react"
import axios from 'axios';
import Page from "../../components/Template/Page";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import TextLink from "../../components/Utils/TextLink";

export default function Home() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

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
        <Page window="mini" auth={false}>
            <Form>
                <Input
                    type="text"
                    label="Nome"
                    name="name"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    type="email"
                    label="Email"
                    name="email"
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
                    text="Cadastre-se"
                    type="submit"
                    onClick={handleSubmit}                
                />

                Já possui conta? <TextLink text="entre aqui!" url="/login" />
            </Form>
        </Page>
    )
}