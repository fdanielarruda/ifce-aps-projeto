import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity } from "react-native"

const LoginLink = () => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            className="mt-4"
            onPress={() => navigation.navigate('Authentication')}
        >
            <Text className="text-blue-600 font-semibold">
                Já possui uma conta? Entre
            </Text>
        </TouchableOpacity>
    )
}

export default LoginLink