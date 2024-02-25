const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        timezone: '-03:00',
        logging: false,
        dialectOptions: {
            searchPath: 'public'
        }
    }
)

const getSequelize = () => {
    return db
}

module.exports = {
    getSequelize
}