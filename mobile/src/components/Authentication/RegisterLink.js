import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"

const RegisterLink = () => {
    const navigation = useNavigation()

    return (
        <View className="flex-row justify-between mt-4 w-full">
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
            >
                <Text className="text-blue-500">Não possui conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View >
    )
}

export default RegisterLink