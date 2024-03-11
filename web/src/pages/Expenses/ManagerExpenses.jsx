import React, { useState, useEffect } from "react";
import axios from 'axios';
import Page from "../../components/Template/Page";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import NewExpenseModal from "../../components/Template/MyModal";
import Checkbox from "../../components/Form/Checkbox";
import Select from "../../components/Form/Select";
import Textarea from "../../components/Form/Textarea";

export default function ExpensesList() {
    const defaultData = {
        id: null,
        category_id: '',
        title: '',
        description: '',
        amount: '',
        expense_date: '',
        is_recurring: false,
        recurring_date: '',
        paid_at: true
    }

    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState(defaultData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeCheckbox = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    }

    const handleSubmit = () => {
        const url = import.meta.env.VITE_APP_API_URL;

        let api;
        let destiny;

        if (formData.id) {
            api = axios.put;
            destiny = `${url}/expenses/${formData.id}`;
        } else {
            api = axios.post;
            destiny = `${url}/expenses`;
        }

        api(destiny, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                alert('Despesa salva com sucesso', response);

                window.location.reload();
            })
            .catch(error => {
                alert(`Erro ao criar a despesa: ${error.response.data.message}`);
            });
    };

    const removeExpense = async (id) => {
        const url = import.meta.env.VITE_APP_API_URL;

        await axios.delete(`${url}/expenses/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                alert('Despesa removida com sucesso', response);

                window.location.reload();
            })
            .catch(error => {
                alert(`Erro ao remover a despesa: ${error.response.data.message}`);
            });
    };

    const editExpense = async (id) => {
        const url = import.meta.env.VITE_APP_API_URL;

        await axios.get(`${url}/expenses/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                setFormData(response.data.expense);
                handleShow();
            })
            .catch(error => {
                alert(`Erro ao obter a despesa: ${error.response.data.message}`);
            });
    };

    const fetchExpenses = async () => {
        try {
            const url = import.meta.env.VITE_APP_API_URL;
            const response = await axios.get(`${url}/expenses`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

            setExpenses(response.data.expenses);
        } catch (error) {
            console.error('Erro ao obter a lista de despesas:', error.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const url = import.meta.env.VITE_APP_API_URL;
            const response = await axios.get(`${url}/categories`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

            setCategories(response.data.categories);
        } catch (error) {
            console.error('Erro ao obter a lista de categorias:', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    return (
        <Page auth={true}>
            <div>
                <h2>Despesas</h2>
                <hr className="my-4" />

                <NewExpenseModal
                    title="Informações da despesa"
                    buttonLabel="Nova despesa"
                    action={() => handleSubmit()}
                    handleClose={handleClose}
                    handleShow={() => { setFormData(defaultData); handleShow() } }
                    show={show}
                >
                    <Form>
                        <Input
                            type="text"
                            label="Título*"
                            value={formData.title}
                            name="title"
                            onChange={handleChange}
                        />

                        <Textarea
                            label="Descrição"
                            value={formData.description}
                            name="description"
                            onChange={handleChange}
                        />

                        <Input
                            type="number"
                            label="Valor*"
                            value={formData.amount}
                            name="amount"
                            onChange={handleChange}
                        />

                        <Checkbox
                            type="checkbox"
                            label="Despesa paga"
                            value={formData.paid_at}
                            name="paid_at"
                            onClick={handleChangeCheckbox}
                        />

                        <Select
                            label="Categoria*"
                            options={categories}
                            value={formData.category_id}
                            name="category_id"
                            onChange={handleChange}
                        />

                        <Input
                            type="date"
                            label="Vencimento"
                            value={formData.expense_date}
                            name="expense_date"
                            onChange={handleChange}
                        />

                        <Checkbox
                            type="checkbox"
                            label="Recorrente"
                            value={formData.is_recurring}
                            name="is_recurring"
                            onClick={handleChangeCheckbox}
                        />

                        {formData.is_recurring && (
                            <Select
                                label="Dia da Recorrência"
                                options={Array.from({ length: 31 }, (_, index) => ({ id: index + 1, title: index + 1 }))}
                                name="recurring_date"
                                onChange={handleChange}
                            />
                        )}

                        <hr />

                        <p><strong>Campos com * são obrigatórios</strong></p>
                    </Form>
                </NewExpenseModal>

                {expenses.length > 0 ? (
                    expenses.map((expense, index) => (
                        <div className="row" key={index}>
                            <div className="col-12 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title text-danger">R$ {Number(expense.amount).toFixed(2).replace('.', ',')} - {expense.title}</h5>
                                        <p className="card-text m-0 text-muted">Descrição: {expense.description ?? "-"} {expense.is_recurring ? ` - Todo dia: ${expense.recurring_date}` : ''}</p>
                                        <p className="card-subtitle m-0 text-muted">Categoria: {expense.category.title}</p>
                                        <p className="card-text m-0 text-muted">{expense.paid_at ? `Pago em: ${new Date(expense.paid_at).toLocaleDateString('pt-BR')}` : null}</p>
                                    </div>

                                    <div className="card-footer">
                                        <button className="btn btn-sm btn-danger" id={`btn_delete_${expense.id}`} onClick={() => removeExpense(expense.id)}>Excluir</button>
                                        <button className="btn btn-sm mx-2 btn-warning" id={`btn_edit_${expense.id}`} onClick={() => editExpense(expense.id)}>Editar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : 'Nenhuma despesa encontrada'}
            </div>
        </Page>
    );
}
