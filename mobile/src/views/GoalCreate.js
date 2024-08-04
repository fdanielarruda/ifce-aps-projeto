import React, { useRef, useState } from 'react'
import { StatusBar, Text, TextInput, View, Platform } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { styled } from 'nativewind'
import DateTimePicker from '@react-native-community/datetimepicker'
import TitleApp from '../components/App/TitleApp'
import CreateGoalButton from '../components/GoalsList/CreateGoalButton'
import FooterApp from '../components/App/FooterApp'
import { showAlert } from '../utils/alertUtils'
import BackToListButton from '../components/GoalsList/BackToListButton'
import apiUtils from '../utils/apiUtils'

const App = ({ route }) => {
    const params = route.params;

    const navigation = useNavigation()

    const descriptionInputRef = useRef(null)
    const dueDateInputRef = useRef(null)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            if (params?.goal) {
                setTitle(params.goal.title)
                setDescription(params.goal.description)
                setDueDate(new Date(params.goal.due_date))
                return;
            } 

            setTitle('')
            setDescription('')
            setDueDate(new Date())
        }, [])
    )

    const handleCreateUpdateGoal = async () => {
        try {
            if (!title) {
                showAlert('Campos obrigatórios', 'Preencha o título do objetivo.')
                return
            }

            const route = params?.goal ? `goals/${params.goal.id}` : 'goals'
            const method = params?.goal ? 'PUT' : 'POST'

            const response = await apiUtils(route, method, {
                title,
                description,
                due_date: dueDate,
            }, navigation)

            if (response.isSuccess) {
                const message = params?.goal ? 'Objetivo atualizado com sucesso.' : 'Objetivo cadastrado com sucesso.'
                showAlert('Sucesso', message, () => navigation.navigate('GoalsList'))
                return
            }

            showAlert('Erro', response.message || 'Não foi possível fazer o cadastro.')
        } catch (error) {
            console.log(error)
            showAlert('Erro de conexão', 'Erro ao realizar requisição.')
        }
    }

    const handleBackToList = () => {
        navigation.navigate('GoalsList')
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dueDate
        setShowDatePicker(Platform.OS === 'ios')
        setDueDate(currentDate)
        setShowDatePicker(false)
    }

    const toggleDatepicker = () => {
        setShowDatePicker(!showDatePicker)
    }

    return (
        <>
            <TitleApp
                title={params?.goal ? 'Editar Objetivo' : 'Novo Objetivo'}
                icon="format-list-checks"
            />

            <View className="flex-1 p-6 px-3 bg-white">
                <StatusBar hidden={false} />

                <View className="flex-1 justify-between">
                    <View>
                        <View className="mt-4 w-full">
                            <Text className="text-gray-600 mb-2">Título</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded"
                                placeholder="Objetivo"
                                returnKeyType="next"
                                onChangeText={setTitle}
                                value={title}
                                onSubmitEditing={() => descriptionInputRef.current.focus()}
                            />
                        </View>

                        <View className="mt-4 w-full">
                            <Text className="text-gray-600 mb-2">Descrição</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded"
                                placeholder="Descrição"
                                returnKeyType="next"
                                ref={descriptionInputRef}
                                onChangeText={setDescription}
                                value={description}
                                onSubmitEditing={() => dueDateInputRef.current.focus()}
                            />
                        </View>

                        <View className="mt-4 w-full">
                            <Text className="text-gray-600 mb-2">Concluir até</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded"
                                placeholder="Data de Entrega"
                                returnKeyType="done"
                                ref={dueDateInputRef}
                                onFocus={toggleDatepicker}
                                value={dueDate.toLocaleDateString('pt-BR')}
                                editable={true}
                            />
                            {showDatePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dueDate}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>

                    <View>
                        <CreateGoalButton onPress={handleCreateUpdateGoal} goal={params?.goal} />
                        <BackToListButton onPress={handleBackToList} />
                    </View>
                </View>
            </View>

            <FooterApp />
        </>
    )
}

export default styled(App)