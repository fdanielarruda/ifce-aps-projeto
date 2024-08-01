import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { styled } from 'nativewind';
import Goal from '../components/GoalsList/Goal';
import TitleApp from '../components/App/TitleApp';
import ShowHideButton from '../components/GoalsList/ShowHideButton';
import CreateGoalButton from '../components/GoalsList/CreateGoalButton';
import FooterApp from '../components/App/FooterApp';
import { showAlert } from '../utils/alertUtils';
import apiUtils from '../utils/apiUtils';

const App = () => {
    const navigation = useNavigation();

    const [list, setList] = useState([]);
    const [hideCompleted, setHideCompleted] = useState(true);

    useEffect(() => {
        getAllGoals(hideCompleted);
    }, [hideCompleted]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllGoals(hideCompleted);
        });

        return unsubscribe;
    }, [navigation]);

    const getAllGoals = async (showCompleted = false) => {
        try {
            const response = await apiUtils(`goals?show_completed=${showCompleted}`, 'GET', {}, navigation);

            if (response.status === 200) {
                setList(response.data);
            } else {
                showAlert('Erro', response.message || 'Não foi possível obter os objetivos.');
            }
        } catch (error) {
            console.log(error);
            showAlert('Erro de conexão', 'Erro ao realizar requisição.');
        }
    };

    const handleGoalCompletedAt = async (id, isCompleted) => {
        try {
            const response = await apiUtils(`goals/${id}/completed_at`, 'PATCH', { is_completed: isCompleted }, navigation);

            if (response.status === 200) {
                const updatedGoal = response.data;
                const updatedList = list.map(item => item.id === updatedGoal.id ? updatedGoal : item);
                setList(updatedList);
            } else {
                showAlert('Erro', response.message || 'Não foi possível atualizar o objetivo.');
            }
        } catch (error) {
            console.log(error);
            showAlert('Erro de conexão', 'Erro ao realizar requisição.');
        }
    };

    const handleDeleteGoal = async (id) => {
        try {
            const response = await apiUtils(`goals/${id}`, 'DELETE', {}, navigation);

            if (response.isSuccess) {
                const updatedList = list.filter(item => item.id !== id);
                setList(updatedList);
            } else {
                showAlert('Erro', response.message || 'Não foi possível excluir o objetivo.');
            }
        } catch (error) {
            console.log(error);
            showAlert('Erro de conexão', 'Erro ao realizar requisição.');
        }
    }

    const handleCreateGoal = () => {
        navigation.navigate('GoalCreate');
    };

    return (
        <>
            <TitleApp
                title="Seus Objetivos"
                icon="format-list-checks"
            />

            <View className="flex-1 p-6 px-3 bg-white">
                <StatusBar hidden={false} />

                <ShowHideButton
                    hideCompleted={hideCompleted}
                    setHideCompleted={setHideCompleted}
                />

                <View className="flex-1 justify-between">
                    <ScrollView>
                        <View>
                            {list.map(goal => (
                                <Goal
                                    key={goal.id}
                                    title={goal.title}
                                    description={goal.description}
                                    dueDate={goal.due_date}
                                    completedAt={goal.completed_at}
                                    setIsCompleted={() => handleGoalCompletedAt(goal.id, goal.completed_at == null)}
                                    onDelete={() => handleDeleteGoal(goal.id)}
                                />
                            ))}
                        </View>
                    </ScrollView>

                    <CreateGoalButton onPress={handleCreateGoal} />
                </View>
            </View>

            <FooterApp />
        </>
    );
};

export default styled(App);
