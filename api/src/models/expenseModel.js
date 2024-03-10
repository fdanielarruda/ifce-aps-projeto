const { DataTypes } = require("sequelize");
const { getSequelize } = require("../config/database");
const Category = require("./categoryModel");

const Expense = getSequelize().define(
    'expenses',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2)
        },
        expense_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        is_recurring: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        recurring_date: {
            type: DataTypes.DATE
        },
        paid_at: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'expenses',
        timestamps: true,
        underscored: true
    }
);

Expense.belongsTo(Category, { foreignKey: 'category_id', as: 'category'});

module.exports = Expense;