import { Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default ({ onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-center bg-gray-500 p-2 rounded-lg mb-5"
    >
        <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color="white"
            className="mr-2"
        />

        <Text className="text-white text-lg ml-2">Voltar</Text>
    </TouchableOpacity>
)