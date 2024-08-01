import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EditingArea = ({ handleEditAction }) => (
    <>
        <View className="justify-between">
            <TouchableOpacity
                className="items-center bg-gray-500 p-3 rounded mb-2"
                onPress={() => handleEditAction('cancel')}
            >
                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="cancel" size={24} color="white" />
                    <Text className="text-white font-semibold ml-2">Cancelar</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity
                className="items-center bg-green-500 p-3 rounded mb-2"
                onPress={() => handleEditAction('update')}
            >
                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="check" size={24} color="white" />
                    <Text className="text-white font-semibold ml-2">Salvar</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity
                className="items-center bg-red-500 p-3 rounded mb-2"
                onPress={() => handleEditAction('delete')}
            >
                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="delete" size={24} color="white" />
                    <Text className="text-white font-semibold ml-2">Deletar</Text>
                </View>
            </TouchableOpacity>
        </View>
    </>
)

export default EditingArea;