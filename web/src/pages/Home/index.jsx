import React, { useState, useEffect } from "react"
import { getAuth } from '../../utils/auth'
import Page from "../../components/Template/Page";
import Button from "../../components/Form/Button";

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
        <Page auth={true}>
            <h3 className="mb-4">Bem vindo, {name}</h3>
            
            <hr className="my-4" />

            <Button
                text='Despesas'
                color="info"
                onClick={() => { window.location.href = '/expenses' }}
            />

            <Button
                text='Sair'
                color="danger"
                onClick={() => {
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                }}
            />
        </Page>
    )
}