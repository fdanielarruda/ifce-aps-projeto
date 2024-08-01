import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterApp from '../components/App/FooterApp';
import SeeObjectivesButton from '../components/Home/SeeObjectivesButton';
import CreateObjectivesButton from '../components/Home/CreateObjectivesButton';
import apiUtils from '../utils/apiUtils';

const HomeScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            isAuthenticated();
        });

        return unsubscribe;
    }, [navigation]);

    const isAuthenticated = async () => {
        console.log('isAuth')
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            console.log('notToken')
            navigation.navigate('Authentication');
        }

        isValidToken();
    }

    const isValidToken = async () => {
        try {
            console.log('isToken')
            const token = await AsyncStorage.getItem('token')

            if (token) {
                const response = await apiUtils('auth/me', 'GET', {}, navigation, false)

                if (!response.isSuccess) {
                    console.log(response)
                    navigation.navigate('Authentication');
                }
            }
        } catch (error) {
            console.log(error)
            navigation.navigate('Authentication');
        }
    }

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

                    <SeeObjectivesButton navigation={navigation} />
                    <CreateObjectivesButton navigation={navigation} />
                </View>
            </View>

            <FooterApp />
        </>
    );
}

export default HomeScreen;
