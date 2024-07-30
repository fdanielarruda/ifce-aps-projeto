import { Text, TouchableOpacity, View } from "react-native";

export default ({ hideCompleted, setHideCompleted }) => (
    <View className="flex-row justify-between w-full px-3 mb-6">
        <TouchableOpacity
            onPress={() => setHideCompleted(!hideCompleted)}
        >
            <Text className="text-blue-500 border p-2 rounded border-blue-500">
                {hideCompleted ? 'Mostrar Concluídos' : 'Ocultar Concluídos'}
            </Text>
        </TouchableOpacity>
    </View>
)