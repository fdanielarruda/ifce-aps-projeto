import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"

const LoginLink = () => {
    const navigation = useNavigation()

    return (
        <View className="flex-row justify-between mt-4 w-full">
            <TouchableOpacity
                onPress={() => navigation.navigate('Authentication')}
            >
                <Text className="text-blue-500">
                    Já possui uma conta? Entre
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginLink