import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import apiUtils from '../../utils/apiUtils';

const SyncGoals = ({ goals, setGoals }) => {
    const navigation = useNavigation();

    const [goalsList, setGoalsList] = useState([]);

    const descriptionInputRef = useRef(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getGoalsList();
        });

        return unsubscribe;
    }, []);

    const getGoalsList = async () => {
        try {
            const response = await apiUtils('goals?show_completed=false', 'GET', {}, navigation);

            if (response.status === 200) {
                setGoalsList(response.data);
            } else {
                showAlert('Erro', response.message || 'Não foi possível obter as metas.');
            }
        } catch (error) {
            console.log(error);
            showAlert('Erro de conexão', 'Erro ao realizar requisição.');
        }
    };

    const onSelectedItemsChange = (selectedItems) => {
        setGoals(selectedItems);
    };

    return (
        <View className="mb-2 w-full border rounded border-gray-300 px-3 pt-1">
            <MultiSelect
                hideTags
                items={goalsList}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={goals}
                selectText="Associar a alguma meta?"
                displayKey="title"
                submitButtonText="Concluído"
                submitButtonColor="#3b82f6"
                styleMainWrapper={{
                    borderWidth: 0,
                    borderRadius: 8,
                }}
                styleListContainer={{
                    padding: 0,
                }}
                searchInputStyle={{
                    borderWidth: 0,
                    fontSize: 16,
                    minHeight: 50,
                }}
                inputGroupStyle={{
                    margin: 5,
                }}
                styleItemsContainer={{
                    paddingVertical: 10,
                }}
                styleItem={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 4,
                    paddingVertical: 10,
                }}
                onSubmitEditing={() => descriptionInputRef.current.focus()}
            />
        </View>
    );
};

export default SyncGoals;
