import React, { useRef, useState } from 'react'
import { View, TextInput, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { REACT_API_URL } from '@env'
import PasswordInput from '../components/Authentication/PasswordInput'
import { showAlert } from '../utils/alertUtils'
import RegisterButton from '../components/Register/RegisterButton'
import LoginLink from '../components/Register/LoginLink'

const RegisterScreen = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const passwordInputRef = useRef(null)
    const confirmPasswordInputRef = useRef(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const navigation = useNavigation()

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
        <View className="flex-1 justify-center items-center bg-gray-100">
            <Image
                source={require('../../assets/logo_conta_certa.png')}
                className="w-40 mb-6"
                resizeMode="contain"
            />

            <TextInput
                className="w-3/4 p-3 mb-4 bg-white border border-gray-300 rounded"
                placeholder="Nome"
                onChangeText={setName}
                value={name}
            />

            <TextInput
                className="w-3/4 p-3 mb-4 bg-white border border-gray-300 rounded"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onChangeText={setEmail}
                value={email}
                onSubmitEditing={() => passwordInputRef.current.focus()}
            />

            <PasswordInput
                ref={passwordInputRef}
                value={password}
                onChange={setPassword}
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
                placeholder="Senha"
            />

            <PasswordInput
                ref={confirmPasswordInputRef}
                value={passwordConfirmation}
                onChange={setPasswordConfirmation}
                showPassword={showConfirmPassword}
                toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                placeholder="Confirmação de Senha"
            />

            <RegisterButton onPress={handleRegister} />

            <LoginLink />
        </View>
    )
}

export default RegisterScreen