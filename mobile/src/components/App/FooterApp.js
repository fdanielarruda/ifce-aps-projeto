import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

export default () => {
    return (
        <View className="flex-row justify-around items-center p-3 border-t border-gray-300 bg-white">
            <TouchableOpacity className="flex-1 items-center">
                <MaterialCommunityIcons name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center">
                <MaterialCommunityIcons name="cash-multiple" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center">
                <MaterialCommunityIcons name="format-list-checks" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center">
                <MaterialCommunityIcons name="account" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}