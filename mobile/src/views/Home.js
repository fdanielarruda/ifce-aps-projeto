import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default props => (
    <View className="flex-1 p-6 justify-center bg-white">
        <View className="items-center">
            <Image
                source={require('../../assets/logo_conta_certa.png')}
                className="w-40"
                resizeMode="contain"
            />
        </View>
    </View>
)