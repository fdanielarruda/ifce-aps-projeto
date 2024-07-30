import { Text, TouchableOpacity } from "react-native";

export default ({ onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-center bg-blue-500 p-2 rounded-lg mt-5 mb-5"
    >
        <Text className="text-white text-lg ml-2">Cadastrar Novo</Text>
    </TouchableOpacity>
)