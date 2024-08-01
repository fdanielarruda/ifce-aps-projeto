import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Transaction = ({ item, onEdit }) => (
    <View className={`flex-row items-center border border-gray-300 bg-white p-3 mb-2 rounded ${item.amount > 0 ? 'border-green-300' : 'border-red-300'}`}>
        <MaterialCommunityIcons
            name={item.amount > 0 ? 'plus-circle-outline' : 'minus-circle-outline'}
            size={24}
            color={item.amount > 0 ? '#22c55e' : '#dc2626'}
            className="mr-3"
        />
        <View className="flex-1">
            <Text className={`font-bold`}>
                R$ {parseFloat(item.amount).toFixed(2)}
            </Text>
            <Text>{item.title}</Text>
        </View>
        <TouchableOpacity onPress={() => onEdit(item)}>
            <MaterialCommunityIcons
                name="pencil"
                size={24}
                color="#6b7280"
            />
        </TouchableOpacity>
    </View>
)

export default Transaction;
