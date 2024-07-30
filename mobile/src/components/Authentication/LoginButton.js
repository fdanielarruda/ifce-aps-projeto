import { Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'

const LoginButton = ({ onPress }) => (
    <TouchableOpacity
        className="bg-black rounded p-3 mt-6 flex-row items-center justify-center w-full"
        onPress={onPress}
    >
        <MaterialCommunityIcons
            name="login"
            size={24}
            color="white"
            className="mr-2"
        />
        <Text className="text-white text-center pl-2 font-bold">ENTRAR</Text>
    </TouchableOpacity>
)

export default LoginButton