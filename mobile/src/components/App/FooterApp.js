import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native'
import authUtils from '../../utils/authUtils';

export default () => {
    const navigation = useNavigation()

    return (
        <View className="flex-row justify-around items-center p-3 border-t border-gray-300 bg-white">
            <TouchableOpacity
                className="flex-1 items-center"
                onPress={() => navigation.navigate('Home')}
            >
                <MaterialCommunityIcons name="home" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 items-center"
                onPress={() => navigation.navigate('GoalsList')}
            >
                <MaterialCommunityIcons name="format-list-checks" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 items-center"
                onPress={() => navigation.navigate('Home')}
            >
                <MaterialCommunityIcons name="cash-multiple" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 items-center"
                onPress={() => authUtils.logout(navigation)}
            >
                <MaterialCommunityIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}