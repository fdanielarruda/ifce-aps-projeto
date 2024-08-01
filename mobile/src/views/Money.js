import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterApp from '../components/App/FooterApp';
import TitleApp from '../components/App/TitleApp';
import apiUtils from '../utils/apiUtils';
import { showAlert } from '../utils/alertUtils';
import ManagementArea from '../components/Money/ManagementArea';
import Transaction from '../components/Money/Transaction';
import EditingArea from '../components/Money/EditingArea';
import { StatusBar } from 'expo-status-bar';

const MoneyScreen = () => {
    const navigation = useNavigation();

    const [isEditing, setIsEditing] = useState(null);

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

    const handleSaveTransaction = async () => {
        try {
            let amountValue = parseFloat(amount);

            if (isNaN(amountValue) || !reason) {
                showAlert('Erro', 'Por favor, insira um valor válido e um motivo.');
                return;
            }

            if (amountValue === 0) {
                showAlert('Erro', 'Por favor, insira um valor diferente de 0.');
                return;
            }

            const response = await apiUtils(`transactions/${isEditing}`, 'PUT', {
                title: reason,
                amount: amountValue,
            }, navigation);

            if (response.isSuccess) {
                const updatedTransactions = transactions.map(item => {
                    if (item.id === isEditing) {
                        item.amount = amountValue;
                        item.title = reason;
                    }

                    return item;
                });

                setTransactions(updatedTransactions);

                setIsEditing(null);
                setAmount('');
                setReason('');

                showAlert('Sucesso', 'Transação atualizada com sucesso.');
                return;
            }

            showAlert('Erro', response.message || 'Não foi possível atualizar a transação.');
        } catch (error) {
            console.log(error);
            showAlert('Erro de conexão', 'Erro ao realizar requisição.');
        }
    };

    const handleDeleteTransaction = async () => {
        try {
            const response = await apiUtils(`transactions/${isEditing}`, 'DELETE', {}, navigation);

            if (response.isSuccess) {
                const updatedTransactions = transactions.filter(item => item.id !== isEditing);
                setTransactions(updatedTransactions);

                setIsEditing(null);
                setAmount('');
                setReason('');

                showAlert('Sucesso', 'Transação deletada com sucesso.');
                return;
            }

            showAlert('Erro', response.message || 'Não foi possível deletar a transação.');
        } catch (error) {
            console.log(error);
            showAlert('Erro de conexão', 'Erro ao realizar requisição.');
        }
    };

    const handleCancelEditTransaction = () => {
        setIsEditing(null);
        setAmount('');
        setReason('');
    };

    const handleEdit = async (item) => {
        setAmount(item.amount.toString());
        setReason(item.title);
        setIsEditing(item.id);
    }

    const handleEditAction = async (action) => {
        if (action === 'cancel') {
            handleCancelEditTransaction();
            return;
        }

        if (action === 'update') {
            handleSaveTransaction();
            return;
        }

        if (action === 'delete') {
            handleDeleteTransaction();
        }
    }

    return (
        <>
            <TitleApp title="Saldo e Histórico" icon="cash-multiple" />

            <View className="flex-1 p-6 px-3 bg-white">
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

                    {
                        !isEditing
                            ? <ManagementArea handleTransaction={handleTransaction} />
                            : <EditingArea handleEditAction={handleEditAction} />
                    }

                </View>

                {
                    !isEditing
                        ? <>
                            {transactions.length > 0 && (
                                <Text className="text-lg font-bold mb-4">Movimentações</Text>
                            )}

                            <ScrollView className="flex-1">
                                {transactions.map(item => (
                                    <Transaction
                                        key={item.id.toString()}
                                        item={item}
                                        onEdit={() => handleEdit(item)}
                                    />
                                ))}
                            </ScrollView>
                        </>
                        : null
                }
            </View >

            <FooterApp />
        </>
    );
}

export default MoneyScreen;
