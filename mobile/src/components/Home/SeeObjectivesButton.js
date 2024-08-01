import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'

const SeeObjectivesButton = ({ navigation }) => (
    <View className="w-full px-4">
        <TouchableOpacity
            onPress={() => navigation.navigate('GoalsList')}
            className="flex-row items-center justify-center bg-purple-500 p-2 rounded-lg mt-5"
        >
            <MaterialCommunityIcons
                name="eye"
                size={24}
                color="white"
                className="mr-2"
            />

            <Text className="text-white text-lg ml-2">Ver Objetivos</Text>
        </TouchableOpacity>
    </View>
);

export default SeeObjectivesButton;