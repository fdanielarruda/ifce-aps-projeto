import React, { useRef, useState } from 'react'
import { StatusBar, Text, TextInput, View, Platform, ScrollView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { styled } from 'nativewind'
import DateTimePicker from '@react-native-community/datetimepicker'
import TitleApp from '../components/App/TitleApp'
import FooterApp from '../components/App/FooterApp'
import { showAlert } from '../utils/alertUtils'
import apiUtils from '../utils/apiUtils'
import SearchReportButton from '../components/GoalsList/SearchReportButton'

const App = ({ route }) => {
    const params = route.params;

    const navigation = useNavigation()

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [datePickerType, setDatePickerType] = useState('startDate')
    const [dataReportDespesas, setDataReportDespesas] = useState([])
    const [dataReportReceitas, setDataReportReceitas] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            if (params?.goal) {
                setStartDate(new Date(params.goal.start_date))
                setEndDate(new Date(params.goal.end_date))
                return;
            }

            setStartDate(new Date())
            setEndDate(new Date())
        }, [])
    )

    const handleSearch = async () => {
        try {
            if (!startDate || !endDate) {
                showAlert('Campos obrigatórios', 'Selecione as datas de início e fim.')
                return
            }

            // voltar um dia
            let date_end = new Date(endDate)
            // date_end.setDate(date_end.getDate() - 1)
            date_end = date_end.toISOString().split('T')[0]

            let date_start = new Date(startDate)
            // date_start.setDate(date_start.getDate() - 1)
            date_start = date_start.toISOString().split('T')[0]

            const response = await apiUtils(`transactions/organize-by-categories?date_start=${date_start}&date_end=${date_end}`, 'GET')

            if (response.isSuccess) {
                setDataReportReceitas([])
                setDataReportDespesas([])

                try {
                    if (response.data?.despesas) {
                        setDataReportDespesas(response.data.despesas)
                    }
                } catch (error) {
                    console.log(error)
                }

                try {
                    if (response.data?.receitas) {
                        setDataReportReceitas(response.data.receitas)
                    }
                } catch (error) {
                    console.log(error)
                }

                showAlert('Sucesso', 'Relatórios obtidos com sucesso.')
            } else {
                showAlert('Erro', response.message || 'Não foi possível obter os relatórios.')
            }
        } catch (error) {
            console.log(error)
            showAlert('Erro de conexão', 'Erro ao realizar requisição.')
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || (datePickerType === 'startDate' ? startDate : endDate)
        setShowDatePicker(Platform.OS === 'ios')
        if (datePickerType === 'startDate') {
            setStartDate(currentDate)
        } else if (datePickerType === 'endDate') {
            setEndDate(currentDate)
        }
        setShowDatePicker(false)
    }

    const toggleDatepicker = (type) => {
        setDatePickerType(type)
        setShowDatePicker(!showDatePicker)
    }

    return (
        <>
            <TitleApp
                title="Buscar Relatórios"
                icon="plus"
            />

            <View className="flex-1 p-6 px-3 bg-white">
                <StatusBar hidden={false} />

                <View className="flex-1 justify-between">
                    <ScrollView>
                        <View className="mt-4 w-full">
                            <Text className="text-gray-600 mb-2">Data de Início</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded"
                                placeholder="Data de Início"
                                returnKeyType="next"
                                onFocus={() => toggleDatepicker('startDate')}
                                value={startDate.toLocaleDateString('pt-BR')}
                                editable={true}
                            />
                            {showDatePicker && datePickerType === 'startDate' && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={startDate}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>

                        <View className="mt-4 w-full">
                            <Text className="text-gray-600 mb-2">Data de Fim</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded"
                                placeholder="Data de Fim"
                                returnKeyType="done"
                                onFocus={() => toggleDatepicker('endDate')}
                                value={endDate.toLocaleDateString('pt-BR')}
                                editable={true}
                            />
                            {showDatePicker && datePickerType === 'endDate' && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={endDate}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>

                        <SearchReportButton onPress={handleSearch} />

                        <View>
                            {
                                dataReportDespesas.length > 0 && (
                                    <>
                                        <Text className="text-lg font-bold mt-4">Relatório de Despesas</Text>

                                        <View className="mt-4">
                                            {dataReportDespesas.map((item, index) => (
                                                <View key={index} className="flex-row justify-between items-center border-b border-gray-300 py-2">
                                                    <Text className="text-lg">{item.categoria}</Text>
                                                    <Text className="text-lg">R$ {item.total.toFixed(2)}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </>
                                )
                            }

                            {
                                dataReportReceitas.length > 0 && (
                                    <>
                                        <Text className="text-lg font-bold mt-4">Relatório de Receitas</Text>

                                        <View className="mt-4">
                                            {dataReportReceitas.map((item, index) => (
                                                <View key={index} className="flex-row justify-between items-center border-b border-gray-300 py-2">
                                                    <Text className="text-lg">{item.categoria}</Text>
                                                    <Text className="text-lg">R$ {item.total.toFixed(2)}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </>
                                )
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>

            <FooterApp />
        </>
    )
}

export default styled(App)
