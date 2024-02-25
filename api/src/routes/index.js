const { Router } = require("express")

const { authController } = require('../controllers')

const routes = Router()

routes.get('/', (req, res) => res.json({ msg: `API ${process.env.PROJECT_NAME}` }))

routes.post('/auth/login', authController.login)
routes.post('/auth/register', authController.register)
routes.post('/auth/verify', authController.verify)

routes.use((req, res) => res.status(404).json({ message: "Rota não encontrada" }))

module.exports = routes