const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const { User } = require("../models")

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) 
            throw new Error('E-mail e senha são obrigatórios')
        
        const user = await User.findOne({ where: { email } })

        if (!user)
            throw new Error('Usuário não encontrado')

        if (!await bcrypt.compare(password, user.password))
            throw new Error('Senha inválida')
        
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '12h' });

        return res.json({ message: 'Login realizado', token })       
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) 
            throw new Error('Nome, e-mail e senha são obrigatórios')

        if (await User.findOne({ where: { email } }))
            throw new Error('E-mail já cadastrado')

        const encriptedPassword = await bcrypt.hash(password, 5)

        const user = await User.create({ 
            name, 
            email, 
            password: encriptedPassword
        })

        return res.json({ message: 'Usuário cadastrado', user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const verify = async (req, res) => {
    try {
        const [, bearerToken] = req.headers.authorization.split(' ')

        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                throw new Error('Token inválido')

            return res.json({ message: 'Token válido', user: decoded.user })
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    login,
    register,
    verify
}