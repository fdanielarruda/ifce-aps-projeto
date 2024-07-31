import React from 'react';
import { Image, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterApp from '../components/App/FooterApp';

const HomeScreen = (props) => {
    const navigation = useNavigation();

    return (
        <>
            <View className="flex-1 p-6 justify-center bg-white">
                <View className="items-center mb-6">
                    <Image
                        source={require('../../assets/logo_conta_certa.png')}
                        className="w-40"
                        resizeMode="contain"
                    />
                </View>
                <View className="items-center">
                    <Text className="text-xl font-bold mb-4">Bem-vindo ao Conta Certa!</Text>

                    <Text className="text-center text-gray-600 mb-6">
                        Seu aplicativo para gerenciar objetivos e metas de forma simples e eficiente.
                    </Text>

                    <View className="w-full px-4">
                        <Button
                            title="Ver Objetivos"
                            onPress={() => navigation.navigate('GoalsList')}
                            color="#6200EE"
                        />
                    </View>

                    <View className="w-full px-4 mt-4">
                        <Button
                            title="Criar Novo Objetivo"
                            onPress={() => navigation.navigate('GoalCreate')}
                            color="#03DAC6"
                        />
                    </View>
                </View>
            </View>

            <FooterApp />
        </>
    );
}

export default HomeScreen;
