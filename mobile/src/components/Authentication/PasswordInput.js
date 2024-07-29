import { TextInput, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'

const PasswordInput = ({ value, onChange, ref, showPassword, toggleShowPassword }) => (
    <View className="w-3/4 flex-row items-center">
        <TextInput
            ref={ref}
            className="flex-1 p-3 bg-white border border-gray-300 rounded-l"
            placeholder="Senha"
            secureTextEntry={!showPassword}
            onChangeText={onChange}
            value={value}
        />
        <TouchableOpacity
            className="p-4 bg-white border border-gray-300 rounded-r flex justify-center items-center"
            onPress={toggleShowPassword}
        >
            <MaterialCommunityIcons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="gray"
            />
        </TouchableOpacity>
    </View>
)

export default PasswordInput