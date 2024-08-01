import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ManagementArea = ({ handleTransaction }) => (
    <View className="flex-row justify-between">
        <TouchableOpacity
            className="flex-1 items-center bg-green-500 p-3 rounded mr-2"
            onPress={() => handleTransaction('add')}
        >
            <View className="flex-row items-center">
                <MaterialCommunityIcons name="plus-circle-outline" size={24} color="white" />
                <Text className="text-white font-semibold ml-2">Entrada</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
            className="flex-1 items-center bg-red-500 p-3 rounded ml-2"
            onPress={() => handleTransaction('remove')}
        >
            <View className="flex-row items-center">
                <MaterialCommunityIcons name="minus-circle-outline" size={24} color="white" />
                <Text className="text-white font-semibold ml-2">Saída</Text>
            </View>
        </TouchableOpacity>
    </View>
)

export default ManagementArea;