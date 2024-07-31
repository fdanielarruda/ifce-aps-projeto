import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";

const Goal = ({ id, title, description, dueDate, completedAt, setIsCompleted }) => {
    return (
        <View className="flex-row justify-between items-center p-4 border-t border-gray-200" key={id}>
            <View>
                <Text className="text">
                    <Text className="font-semibold">{title}</Text>{description ? `: ${description}` : ''}
                </Text>
                {
                    dueDate ?
                        <Text className="text-gray-500 text-xs">
                            {dueDate}
                        </Text>
                        : null
                }
            </View>
            <TouchableOpacity
                className={`w-6 h-6 border-2 rounded ${completedAt ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}
                onPress={setIsCompleted}
            >
                {completedAt && <Text className="text-white text-center font-bold">✓</Text>}
            </TouchableOpacity>
        </View>
    );
}

export default styled(Goal);
