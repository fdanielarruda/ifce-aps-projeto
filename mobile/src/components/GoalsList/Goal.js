import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";

const Goal = ({ id, title, isCompleted, setIsCompleted }) => {
    return (
        <View className="flex-row justify-between items-center p-4 border-t border-gray-200" key={id}>
            <Text className="text">
                {title}
            </Text>
            <TouchableOpacity
                className={`w-6 h-6 border-2 rounded ${isCompleted ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}
                onPress={() => setIsCompleted(!isCompleted)}
            >
                {isCompleted && <Text className="text-white text-center font-bold">✓</Text>}
            </TouchableOpacity>
        </View>
    );
}

export default styled(Goal);
