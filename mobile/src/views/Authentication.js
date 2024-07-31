import React, { useRef, useState } from 'react'
import { View, TextInput, Image, Text } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { REACT_API_URL } from '@env'
import { showAlert } from '../utils/alertUtils'
import LoginButton from '../components/Authentication/LoginButton'
import RegisterLink from '../components/Authentication/RegisterLink'
import axios from 'axios'
import apiUtils from '../utils/apiUtils'

const LoginScreen = () => {
    const passwordInputRef = useRef(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                isValidToken()

                setEmail('')
                setPassword('')
            }
        }, [])
    )

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                showAlert('Campos obrigatórios', 'Preencha email e senha.')
                return
            }

            const response = await apiUtils('auth/login', 'POST', { email, password }, navigation, false)

            if (response.isSuccess) {
                await AsyncStorage.setItem('token', response.data.access_token)

                showAlert(
                    'Login bem-sucedido',
                    'Você será redirecionado para a tela inicial.',
                    () => navigation.navigate('GoalsList')
                )
            } else {
                showAlert('Erro', response.message || 'Erro ao realizar login.')
            }
        } catch (error) {
            console.log(error)
            showAlert('Erro de conexão', 'Erro ao realizar requisição.')
        }
    }

    const isValidToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token')

            if (token) {
                const response = await apiUtils('auth/me', 'POST', {}, navigation, false)

                if (response.isSuccess) {
                    navigation.navigate('Home')
                }
            }
        } catch (error) {
            console.log(error)
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
                    onChangeText={setPassword}
                />
            </View>

            <RegisterLink />

            <LoginButton onPress={handleLogin} />
        </View>
    )
}

export default LoginScreen
