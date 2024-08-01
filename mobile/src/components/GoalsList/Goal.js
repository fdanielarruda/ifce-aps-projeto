import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { SwipeRow } from 'react-native-swipe-list-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Goal = ({ id, title, description, dueDate, completedAt, setIsCompleted, onDelete }) => {
    return (
        <SwipeRow rightOpenValue={-55} disableRightSwipe>
            <View className="flex-row justify-end items-center bg-silver-500">
                <View className="flex-row bg-red-500 h-20 w-14 justify-center items-center">
                    <TouchableOpacity onPress={onDelete}>
                        <Text className="text-white pb-3">
                            <MaterialCommunityIcons
                                name="delete"
                                size={24}
                                color="white"
                            />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex-row justify-between items-center p-4 border-t border-gray-200 bg-white" key={id}>
                <View>
                    <Text className="text">
                        <Text className="font-semibold">{title}</Text>{description ? `: ${description}` : ''}
                    </Text>
                    {dueDate && <Text className="text-gray-500 text-xs">{dueDate}</Text>}
                </View>
                <TouchableOpacity
                    className={`w-6 h-6 border-2 rounded ${completedAt ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}
                    onPress={setIsCompleted}
                >
                    {completedAt && <Text className="text-white text-center font-bold">✓</Text>}
                </TouchableOpacity>
            </View>
        </SwipeRow>
    );
}

export default styled(Goal);
