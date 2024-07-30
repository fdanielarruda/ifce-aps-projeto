import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Goal from '../components/GoalsList/Goal';
import { styled } from 'nativewind';
import TitleApp from '../components/App/TitleApp';
import ShowHideButton from '../components/GoalsList/ShowHideButton';
import CreateGoalButton from '../components/GoalsList/CreateGoalButton';
import FooterApp from '../components/App/FooterApp';

const App = () => {
    const [originalList] = useState([
        { id: 1, title: 'Economizar 1000 reais', isCompleted: false },
        { id: 2, title: 'Fazer 30 minutos de exercício', isCompleted: true },
        { id: 3, title: 'Ler 1 livro', isCompleted: false },
        { id: 4, title: 'Aprender React Native', isCompleted: true },
        { id: 12, title: 'Fazer 30 minutos de exercício', isCompleted: true },
        { id: 13, title: 'Ler 1 livro', isCompleted: false },
        { id: 24, title: 'Aprender React Native', isCompleted: true },
        { id: 22, title: 'Fazer 30 minutos de exercício', isCompleted: true },
        { id: 33, title: 'Ler 1 livro', isCompleted: false },
        { id: 34, title: 'Aprender React Native', isCompleted: true },
        { id: 42, title: 'Fazer 30 minutos de exercício', isCompleted: true },
        { id: 43, title: 'Ler 1 livro', isCompleted: false },
        { id: 54, title: 'Aprender React Native', isCompleted: true },
        { id: 52, title: 'Fazer 30 minutos de exercício', isCompleted: true },
        { id: 63, title: 'Ler 1 livro', isCompleted: false },
        { id: 64, title: 'Aprender React Native', isCompleted: true },
        { id: 72, title: 'Fazer 30 minutos de exercício', isCompleted: true },
        { id: 73, title: 'Ler 1 livro', isCompleted: false },
        { id: 84, title: 'Aprender React Native', isCompleted: true }
    ]);

    const [list, setList] = useState(originalList);
    const [hideCompleted, setHideCompleted] = useState(true);

    useEffect(() => {
        if (hideCompleted) {
            setList(originalList.filter(goal => !goal.isCompleted));
        } else {
            setList(originalList);
        }
    }, [hideCompleted, originalList]);

    const updateIsCompleted = (id, isCompleted) => {
        const updatedList = list.map(goal => {
            if (goal.id === id) {
                goal.isCompleted = isCompleted;
            }

            return goal;
        });

        setList(updatedList);
    }

    const handleCreateGoal = () => {
        setList([
            ...list,
            {
                id: Math.random(),
                title: 'Novo objetivo',
                isCompleted: false
            }
        ]);
    }

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
                                    isCompleted={goal.isCompleted}
                                    setIsCompleted={() => updateIsCompleted(goal.id, !goal.isCompleted)}
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
}

export default styled(App);
