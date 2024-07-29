import { Alert } from 'react-native'

export const showAlert = (title, message, onPress) => {
    Alert.alert(title, message, [{ text: 'OK', onPress }]);
}