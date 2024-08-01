import { Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default ({ onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-center bg-blue-500 p-2 rounded-lg mt-5 mb-2"
    >
        <MaterialCommunityIcons
            name="plus-circle"
            size={24}
            color="white"
            className="mr-2"
        />

        <Text className="text-white text-lg ml-2">Cadastrar Novo</Text>
    </TouchableOpacity>
)