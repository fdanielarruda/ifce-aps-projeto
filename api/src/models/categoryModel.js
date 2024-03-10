const { DataTypes } = require("sequelize");
const { getSequelize } = require("../config/database");

const Category = getSequelize().define(
    'categories',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'categories',
        timestamps: true,
        underscored: true
    }
);

module.exports = Category;