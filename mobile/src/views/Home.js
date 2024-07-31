import React from 'react'
import { Image, View } from 'react-native'
import FooterApp from '../components/App/FooterApp'

export default props => (
    <>
        <View className="flex-1 p-6 justify-center bg-white">
            <View className="items-center">
                <Image
                    source={require('../../assets/logo_conta_certa.png')}
                    className="w-40"
                    resizeMode="contain"
                />
            </View>
        </View>

        <FooterApp />
    </>
)