import React, { useRef, useState } from 'react'
import { View, TextInput, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { REACT_API_URL } from '@env'
import PasswordInput from '../components/Authentication/PasswordInput'
import LoginButton from '../components/Authentication/LoginButton'
import { showAlert } from '../utils/alertUtils'
import RegisterLink from '../components/Authentication/RegisterLink'

const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false)
    const passwordInputRef = useRef(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                showAlert('Campos obrigatórios', 'Preencha email e senha.')
                return
            }

            const response = await fetch(`${REACT_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                showAlert(
                    'Login bem-sucedido',
                    'Você será redirecionado para a tela inicial.',
                    () => navigation.navigate('Home')
                )
            } else {
                showAlert('Erro de login', data.message || 'Ocorreu um erro durante o login.')
            }
        } catch (error) {
            console.error(error)
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
            />

            <LoginButton onPress={handleLogin} />

            <RegisterLink />
        </View>
    )
}

export default LoginScreen