const { Router } = require("express")
const system = require('./system')

const routes = Router()

routes.get('/', (req, res) => res.json({ msg: `API ${process.env.PROJECT_NAME}` }))

routes.use('/api', system)

routes.use('/*', (req, res) => res.status(404).json({ message: "Rota não encontrada" }))

module.exports = routes