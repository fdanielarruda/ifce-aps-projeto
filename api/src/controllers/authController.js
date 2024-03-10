const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const { User } = require("../models")

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password)
            return res.status(400).json({ message: 'E-mail e senha são obrigatórios' })

        const user = await User.findOne({ where: { email } })

        if (!user)
            return res.status(401).json({ message: 'Credenciais inválidas' })

        if (!await bcrypt.compare(password, user.password))
            return res.status(401).json({ message: 'Credenciais inválidas' })
        
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
    return res.json({ message: 'Token válido', user: req._token.user })
}

module.exports = {
    login,
    register,
    verify
}