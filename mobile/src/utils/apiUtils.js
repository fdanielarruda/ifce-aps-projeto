import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { REACT_API_URL } from '@env';

const apiUtils = async (url, method, body = null, navigation, redirect = true) => {
    const token = await AsyncStorage.getItem('token') ?? "";
    console.log(`${REACT_API_URL}/${url}`);

    try {
        const response = await axios({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: `${REACT_API_URL}/${url}`,
            method,
            data: body
        });

        return {
            isSuccess: true,
            status: response.status,
            message: response.data.message || "",
            data: response.data.data,
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status == 401 && redirect) {
                navigation.navigate('Authentication');
            }

            return {
                isSuccess: false,
                status: error.response.status,
                message: error.response.data.message || "",
                data: error.response.data.data,
            };
        } else if (error.request) {
            console.error('No response received:', error.request);
            throw new Error('No response received');
        } else {
            console.error('Error setting up request:', error.message);
            throw new Error('Error setting up request');
        }
    }
};

export default apiUtils;
