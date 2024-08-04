import React, { useRef, useState } from 'react';
import { StatusBar, Text, View, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TitleApp from '../components/App/TitleApp';
import FooterApp from '../components/App/FooterApp';
import BackToListButton from '../components/GoalsList/BackToListButton';
import Transaction from '../components/Money/Transaction';

const GoalView = ({ route }) => {
    const params = route.params;

    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [transactions, setTransactions] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            if (params?.goal) {
                setTitle(params.goal.title);
                setDescription(params.goal.description);
                setDueDate(new Date(params.goal.due_date));
                setTransactions(params.goal.transactions);
                return;
            }

            setTitle('');
            setDescription('');
            setDueDate(new Date());
            setTransactions([]);
        }, [params])
    );

    const handleBackToList = () => {
        navigation.navigate('GoalsList');
    };

    return (
        <>
            <TitleApp
                title="Novo Objetivo"
                icon="format-list-checks"
            />

            <View className="flex-1 p-6 px-3 bg-white">
                <StatusBar hidden={false} />

                <View className="flex-1 justify-between">
                    <View>
                        <View className="mt-4 w-full pb-5 border-gray-200 border-b">
                            <Text className="text-gray-600 text-lg font-semibold">Título: </Text>
                            <Text className="text-gray-600 text-lg">{title}</Text>
                        </View>

                        {description && (
                            <View className="mt-4 w-full pb-5 border-gray-200 border-b">
                                <Text className="text-gray-600 text-lg font-semibold">Descrição: </Text>
                                <Text className="text-gray-600 text-lg">{description}</Text>
                            </View>
                        )}

                        {dueDate && (
                            <View className="mt-4 w-full pb-5 border-gray-200 border-b">
                                <Text className="text-gray-600 text-lg font-semibold">Concluir até: </Text>
                                <Text className="text-gray-600 text-lg">
                                    <View>
                                        <Text>
                                            {dueDate.toLocaleDateString('pt-BR')}
                                        </Text>
                                    </View>
                                    {dueDate < new Date() && (
                                        <View>
                                            <Text className="text-red-400 font-semibold ml-1">
                                                <MaterialCommunityIcons name="alert" size={20} color="#D63232" />
                                            </Text>
                                        </View>
                                    )}
                                </Text>
                            </View>
                        )}

                        {transactions.length > 0 && (
                            <>
                                <View className="mt-4 mb-5 w-full">
                                    <Text className="text-gray-600 text-lg font-semibold">Transações associadas:</Text>
                                </View>

                                <ScrollView>
                                    {transactions.map(item => (
                                        <Transaction
                                            key={item.id.toString()}
                                            item={item}
                                        />
                                    ))}
                                </ScrollView>
                            </>
                        )}
                    </View>

                    <View>
                        <BackToListButton onPress={handleBackToList} />
                    </View>
                </View>
            </View>

            <FooterApp />
        </>
    );
};

export default styled(GoalView);
