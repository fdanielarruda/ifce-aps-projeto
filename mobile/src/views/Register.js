import React, { useRef, useState } from 'react'
import { View, TextInput, Image, Text } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { REACT_API_URL } from '@env'
import { showAlert } from '../utils/alertUtils'
import RegisterButton from '../components/Register/RegisterButton'
import LoginLink from '../components/Register/LoginLink'

const RegisterScreen = () => {
    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const confirmPasswordInputRef = useRef(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setName('')
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
            }
        }, [])
    )

    const handleRegister = async () => {
        try {
            if (!name || !email || !password || !passwordConfirmation) {
                showAlert('Campos obrigatórios', 'Preencha todos os campos.')
                return
            }

            if (password !== passwordConfirmation) {
                showAlert('Erro de validação', 'A senha e a confirmação de senha devem corresponder.')
                return
            }

            const response = await fetch(`${REACT_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation
                }),
            })

            const data = await response.json()

            if (response.ok) {
                showAlert(
                    'Cadastro bem-sucedido',
                    'Você será redirecionado para a tela de login.',
                    () => navigation.navigate('Authentication')
                )
            } else {
                showAlert('Erro de cadastro', data.message || 'Ocorreu um erro durante o cadastro.')
            }
        } catch (error) {
            showAlert('Erro de conexão', 'Não foi possível conectar ao servidor.')
        }
    }

    return (
        <>
            <View className="flex-1 p-6 justify-center items-center bg-gray-100">
                <Image
                    source={require('../../assets/logo_conta_certa.png')}
                    className="w-40"
                    resizeMode="contain"
                />

                <View className="mt-4 w-full">
                    <Text className="text-gray-600 mb-2">Name</Text>
                    <TextInput
                        className="border border-gray-300 p-3 rounded"
                        placeholder="Digite seu nome"
                        returnKeyType="next"
                        onChangeText={setName}
                        value={name}
                        onSubmitEditing={() => emailInputRef.current.focus()}
                    />
                </View>

                <View className="mt-4 w-full">
                    <Text className="text-gray-600 mb-2">E-mail</Text>
                    <TextInput
                        className="border border-gray-300 p-3 rounded"
                        placeholder="Digite seu endereço de e-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
                        ref={emailInputRef}
                        onChangeText={setEmail}
                        value={email}
                        onSubmitEditing={() => passwordInputRef.current.focus()}
                    />
                </View>

                <View className="mt-4 w-full">
                    <Text className="text-gray-600 mb-2">Senha</Text>
                    <TextInput
                        className="border border-gray-300 p-3 rounded"
                        placeholder="Digite sua senha"
                        secureTextEntry
                        ref={passwordInputRef}
                        onChangeText={setPassword}
                        value={password}
                        onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
                    />
                </View>

                <View className="mt-4 w-full">
                    <Text className="text-gray-600 mb-2">Confirmar Senha</Text>
                    <TextInput
                        className="border border-gray-300 p-3 rounded"
                        placeholder="Digite novamente"
                        secureTextEntry
                        ref={confirmPasswordInputRef}
                        onChangeText={setPasswordConfirmation}
                        value={passwordConfirmation}
                    />
                </View>

                <LoginLink />

                <RegisterButton onPress={handleRegister} />
            </View>
        </>
    )
}

export default RegisterScreen