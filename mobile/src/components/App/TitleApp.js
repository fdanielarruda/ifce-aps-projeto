import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

export default ({ title, icon }) => {
    return (
        <View className="flex-row p-3 border-b border-gray-300 bg-white pl-5">
            <MaterialCommunityIcons
                name={icon}
                size={27}
                className="mr-2"
            />
            <Text className="text-xl font-semibold ml-2">
                {title}
            </Text>
        </View>
    )
}