import React, { useRef, useState } from 'react'
import { View, TextInput, Image, Alert, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { REACT_API_URL } from '@env'
import { showAlert } from '../utils/alertUtils'
import LoginButton from '../components/Authentication/LoginButton'
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
            showAlert('Erro de conexão', 'Não foi possível conectar ao servidor.')
        }
    }

    return (
        <View className="flex-1 p-6 justify-center items-center bg-gray-100">
            <Image
                source={require('../../assets/logo_conta_certa.png')}
                className="w-40"
                resizeMode="contain"
            />

            <View className="mt-6 w-full">
                <Text className="text-gray-600 mb-2">E-mail</Text>
                <TextInput
                    className="border border-gray-300 p-3 rounded"
                    placeholder="Digite seu endereço de e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onChangeText={setEmail}
                    value={email}
                    onSubmitEditing={() => passwordInputRef.current.focus()}
                />
            </View>

            <View className="mt-4 w-full">
                <Text className="text-gray-600 mb-2">Senha</Text>
                <TextInput
                    className="border border-gray-300 p-3 rounded"
                    placeholder="**********"
                    secureTextEntry
                    ref={passwordInputRef}
                    value={password}
                    onChange={setPassword}
                    showPassword={showPassword}
                    toggleShowPassword={() => setShowPassword(!showPassword)}
                />
            </View>

            <RegisterLink />

            <LoginButton onPress={handleLogin} />
        </View>
    )
}

export default LoginScreen
