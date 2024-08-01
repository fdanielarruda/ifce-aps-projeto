import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { SwipeRow } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Transaction = ({ item, onEdit, onDelete }) => (
    <SwipeRow rightOpenValue={-112} disableRightSwipe>
        <View className="flex-row justify-end items-center bg-silver-500">
            <View className="flex-row bg-yellow-500 h-16 w-14 justify-center items-center rounded">
                <TouchableOpacity onPress={onEdit}>
                    <Text className="text-white">
                        <MaterialCommunityIcons
                            name="pencil"
                            size={24}
                            color="white"
                        />
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row bg-red-500 h-16 w-14 justify-center items-center rounded">
                <TouchableOpacity onPress={onDelete}>
                    <Text className="text-white">
                        <MaterialCommunityIcons
                            name="delete"
                            size={24}
                            color="white"
                        />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

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
        </View>
    </SwipeRow>
)

export default Transaction;
