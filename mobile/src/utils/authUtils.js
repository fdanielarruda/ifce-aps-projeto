import AsyncStorage from "@react-native-async-storage/async-storage"

const logout = async (navigation) => {
    try {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Authentication');
    } catch (error) {
        console.log(error);
    }
}

export default {
    logout,
};