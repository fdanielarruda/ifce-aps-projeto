import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FooterApp from '../components/App/FooterApp';
import TitleApp from '../components/App/TitleApp';
import apiUtils from '../utils/apiUtils';
import { showAlert } from '../utils/alertUtils';

const MoneyScreen = () => {
    const navigation = useNavigation();
    const [balance, setBalance] = useState(0.00);
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllTransactions();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const balance = transactions.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        setBalance(balance);
    }, [transactions]);

    const getAllTransactions = async () => {
        try {
            const response = await apiUtils(`transactions`, 'GET', {}, navigation);

            if (response.status === 200) {
                setTransactions(response.data);
            } else {
                showAlert('Erro', response.message || 'Não foi possível obter as transações.');
            }
        } catch (error) {
            console.log(error);
            showAlert('Erro de conexão', 'Erro ao realizar requisição.');
        }
    };

    const handleTransaction = async (type) => {
        try {
            let amountValue = Math.abs(parseFloat(amount));

            if (type === 'remove') {
                if (amountValue > balance) {
                    showAlert('Erro', 'Saldo insuficiente.');
                    return;
                }

                amountValue *= -1;
            }

            if (isNaN(amountValue) || !reason) {
                showAlert('Erro', 'Por favor, insira um valor válido e um motivo.');
                return;
            }

            if (amountValue === 0) {
                showAlert('Erro', 'Por favor, insira um valor diferente de 0.');
                return;
            }

            const response = await apiUtils('transactions', 'POST', {
                title: reason,
                amount: amountValue,
            }, navigation)

            if (response.isSuccess) {
                const newTransaction = response.data;
                setTransactions([newTransaction, ...transactions]);

                setAmount('');
                setReason('');

                showAlert('Sucesso', 'Transação cadastrada com sucesso.')
                return
            }

            showAlert('Erro', response.message || 'Não foi possível fazer o cadastro.')
        } catch (error) {
            console.log(error)
            showAlert('Erro de conexão', 'Erro ao realizar requisição.')
        }
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

                {transactions.length > 0 && (
                    <Text className="text-lg font-bold mb-4">Movimentações</Text>
                )}

                <ScrollView className="flex-1">
                    {transactions.map(item => (
                        <View
                            key={item.id.toString()}
                            className={`flex-row items-center border border-gray-300 bg-white p-3 mb-2 rounded ${item.amount > 0 ? 'border-green-300' : 'border-red-300'}`}
                        >
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
                    ))}
                </ScrollView>
            </View>

            <FooterApp />
        </View>
    );
}

export default MoneyScreen;
