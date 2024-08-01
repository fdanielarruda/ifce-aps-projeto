import React, { useState } from 'react';
import { Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FooterApp from '../components/App/FooterApp';
import TitleApp from '../components/App/TitleApp';

const MoneyScreen = () => {
    const navigation = useNavigation();
    const [balance, setBalance] = useState(0.00);
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const [transactions, setTransactions] = useState([]);

    const handleTransaction = (type) => {
        const amountValue = parseFloat(amount);
        if (isNaN(amountValue) || !reason) {
            alert('Por favor, insira um valor válido e um motivo.');
            return;
        }

        const newTransaction = {
            id: transactions.length + 1,
            type,
            amount: amountValue,
            reason,
        };

        setTransactions([newTransaction, ...transactions]);

        const newBalance = type === 'add' ? balance + amountValue : balance - amountValue;
        setBalance(newBalance);

        setAmount('');
        setReason('');
    };

    return (
        <View className="flex-1 bg-white">
            <TitleApp title="Saldo e Histórico" icon="cash-multiple" />

            <View className="flex-1 p-6">
                <View className="items-center mt-3 mb-6">
                    <Text className="text-4xl font-bold">R$ {balance.toFixed(2)}</Text>
                </View>
                <View className="mb-6">
                    <TextInput
                        className="border border-gray-300 p-3 rounded mb-2"
                        placeholder="Valor"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <TextInput
                        className="border border-gray-300 p-3 rounded mb-2"
                        placeholder="Motivo"
                        value={reason}
                        onChangeText={setReason}
                    />
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            className="flex-1 items-center bg-green-500 p-3 rounded mr-2"
                            onPress={() => handleTransaction('add')}
                        >
                            <View className="flex-row items-center">
                                <MaterialCommunityIcons name="plus-circle-outline" size={24} color="white" />
                                <Text className="text-white font-semibold ml-2">Entrada</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-1 items-center bg-red-500 p-3 rounded ml-2"
                            onPress={() => handleTransaction('remove')}
                        >
                            <View className="flex-row items-center">
                                <MaterialCommunityIcons name="minus-circle-outline" size={24} color="white" />
                                <Text className="text-white font-semibold ml-2">Saída</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView className="flex-1">
                    {transactions.length > 0 && (
                        <Text className="text-lg font-bold mb-4">Movimentações</Text>
                    )}
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View className={`flex-row items-center border border-gray-300 bg-white p-3 mb-2 rounded ${item.type === 'add' ? 'border-green-300' : 'border-red-300'}`}>
                                <MaterialCommunityIcons
                                    name={item.type === 'add' ? 'plus-circle-outline' : 'minus-circle-outline'}
                                    size={24}
                                    color={item.type === 'add' ? '#22c55e' : '#dc2626'}
                                    className="mr-3"
                                />
                                <View className="flex-1">
                                    <Text className={`font-bold`}>
                                        R$ {item.amount.toFixed(2)}
                                    </Text>
                                    <Text>{item.reason}</Text>
                                </View>
                            </View>
                        )}
                    />
                </ScrollView>
            </View>

            <FooterApp />
        </View>
    );
}

export default MoneyScreen;
