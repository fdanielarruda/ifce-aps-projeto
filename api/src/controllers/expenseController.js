const { Category, Expense, User } = require("../models")

const create = async (req, res) => {
    try {
        const {
            category_id,
            title,
            description,
            amount,
            expense_date,
            is_recurring,
            recurring_type,
            paid_at
        } = req.body

        // validar obrigatorios
        if (!user_id || !category_id || !title || !amount)
            return res.status(400).json({ message: 'Missing required fields' })

        // validar category_id
        const category = await Category.findByPk(category_id)
        
        if (!category)
            return res.status(400).json({ message: 'Category not found' })

        await Expense.create({
            user_id: req._token.user.id,
            category_id,
            title,
            description,
            amount,
            expense_date,
            is_recurring,
            recurring_type,
            paid_at
        })

        return res.status(201).json({ message: 'Expense created' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const list = async (req, res) => {
    try {
        const user = req._token.user

        const expenses = await Expense.findAll({
            where: { user_id: user.id },
            include: { model: Category, as: 'category' }
        })

        return res.status(200).json({ expenses })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params

        if (!id)
            return res.status(400).json({ message: 'Invalid expense' })

        const expense = await Expense.findByPk(id)

        if (!expense)
            return res.status(400).json({ message: 'Expense not found' })

        await expense.destroy()

        return res.status(200).json({ message: 'Expense removed' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const user = req._token.user

        const {
            category_id,
            title,
            description,
            amount,
            expense_date,
            is_recurring,
            recurring_type,
            paid_at
        } = req.body

        if (!id)
            return res.status(400).json({ message: 'Invalid expense' })

        // validar despesa
        const expense = await Expense.findAll({
            where: { id, user_id: user.id }
        })

        if (!expense.length)
            return res.status(400).json({ message: 'Expense not found' })

        // validar categoria
        if (!category_id)
            return res.status(400).json({ message: 'Invalid category' })

        const category = await Category.findByPk(category_id)

        if (!category)
            return res.status(400).json({ message: 'Category not found' })

        // atualizar despesa
        await Expense.update({
            category_id,
            title,
            description,
            amount,
            expense_date,
            is_recurring,
            recurring_type,
            paid_at
        }, {
            where: { id }
        })

        return res.status(200).json({ message: 'Expense updated' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    create,
    list,
    remove,
    update
}