import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default props => (
    <View className="flex-1 p-6 justify-center bg-white">
        <View className="items-center">
            <Image
                source={require('../../assets/logo_conta_certa.png')}
                className="w-40"
                resizeMode="contain"
            />

            <Text>ERRO DE CONEXÃO, SINTO MUITO!</Text>

            <View>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('GoalsList')}
                    className="bg-blue-500 p-3 rounded mt-4"
                >
                    <Text className="text-white">Tentar novamente</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
)