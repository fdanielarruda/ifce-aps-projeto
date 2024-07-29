import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity } from "react-native"

const RegisterLink = () => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            className="mt-4"
            onPress={() => navigation.navigate('Register')}
        >
            <Text className="text-blue-600 font-semibold">
                Não tem uma conta? Registre-se
            </Text>
        </TouchableOpacity>
    )
}

export default RegisterLink