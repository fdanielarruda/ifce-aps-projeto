import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CreateObjectivesButton = ({ navigation }) => (
    <View className="w-full px-4 mt-4">
        <TouchableOpacity
            onPress={() => navigation.navigate('GoalCreate')}
            className="flex-row items-center justify-center bg-green-500 p-2 rounded-lg mb-2"
        >
            <MaterialCommunityIcons
                name="plus"
                size={24}
                color="white"
                className="mr-2"
            />

            <Text className="text-white text-lg ml-2">Criar Novo Objetivo</Text>
        </TouchableOpacity>
    </View>
);

export default CreateObjectivesButton;