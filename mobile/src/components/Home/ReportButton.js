import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ReportButton = ({ navigation }) => (
    <View className="w-full px-4 mt-2">
        <TouchableOpacity
            onPress={() => navigation.navigate('Reports')}
            className="flex-row items-center justify-center bg-red-500 p-2 rounded-lg mb-2"
        >
            <MaterialCommunityIcons
                name="align-vertical-bottom"
                size={24}
                color="white"
                className="mr-2"
            />

            <Text className="text-white text-lg ml-2">Relatórios</Text>
        </TouchableOpacity>
    </View>
);

export default ReportButton;