import { Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'

const RegisterButton = ({ onPress }) => (
    <TouchableOpacity
        className="bg-black rounded p-3 mt-6 flex-row items-center justify-center w-full"
        onPress={onPress}
    >
        <MaterialCommunityIcons
            name="account-plus"
            size={24}
            color="white"
            className="mr-2"
        />
        <Text className="text-white text-center pl-2 font-bold">CADASTRAR</Text>
    </TouchableOpacity>
)

export default RegisterButton