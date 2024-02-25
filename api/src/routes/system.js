const { Router } = require("express")

const { authController } = require('../controllers')

const routes = Router()

routes.post('/auth/login', authController.login)
routes.post('/auth/register', authController.register)
routes.post('/auth/verify', authController.verify)

module.exports = routes