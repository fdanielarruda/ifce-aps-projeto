import React, { useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { REACT_API_URL } from '@env'

const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false)
    const passwordInputRef = useRef(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    const showAlert = (title, message, onPress) => {
        Alert.alert(title, message, [
            { text: 'OK', onPress }
        ])
    }

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

            <View className="w-3/4 flex-row items-center">
                <TextInput
                    ref={passwordInputRef}
                    className="flex-1 p-3 bg-white border border-gray-300 rounded-l"
                    placeholder="Senha"
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity
                    className="p-4 bg-white border border-gray-300 rounded-r flex justify-center items-center"
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <MaterialCommunityIcons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={20}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                className="w-3/4 p-3 mt-4 bg-blue-900 rounded flex-row items-center justify-center"
                onPress={handleLogin}
            >
                <MaterialCommunityIcons
                    name="login"
                    size={24}
                    color="white"
                    className="mr-2"
                />
                <Text className="text-white text-center ml-1 font-bold">ENTRAR</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen
