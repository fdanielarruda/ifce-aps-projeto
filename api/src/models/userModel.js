const { DataTypes } = require("sequelize");
const { getSequelize } = require("../config/database");

const User = getSequelize().define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: 'users',
        timestamps: true,
        underscored: true
    }
);

module.exports = User;