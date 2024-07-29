import { Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'

const RegisterButton = ({ onPress }) => (
    <TouchableOpacity
        className="w-3/4 p-3 mt-4 bg-blue-900 rounded flex-row items-center justify-center"
        onPress={onPress}
    >
        <MaterialCommunityIcons
            name="account-plus"
            size={24}
            color="white"
            className="mr-2"
        />
        <Text className="text-white text-center ml-1 font-bold">CADASTRAR</Text>
    </TouchableOpacity>
)

export default RegisterButton