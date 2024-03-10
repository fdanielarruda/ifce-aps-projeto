const { Router } = require("express")

const authMiddleware = require("../middlewares/authMiddleware")

const { authController, expenseController } = require('../controllers')

const routes = Router()

routes.get('/', (req, res) => res.json({ msg: `API ORÇA BEM` }))

routes.post('/auth/login', authController.login)
routes.post('/auth/register', authController.register)
routes.post('/auth/verify', authMiddleware, authController.verify)

routes.post('/expenses', authMiddleware, expenseController.create)
routes.get('/expenses', authMiddleware, expenseController.list)
routes.delete('/expenses/:id', authMiddleware, expenseController.remove)
routes.put('/expenses/:id', authMiddleware, expenseController.update)

module.exports = routes