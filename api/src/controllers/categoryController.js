const { Category } = require("../models")

const list = async (req, res) => {
    try {
        const categories = await Category.findAll()

        return res.status(200).json({ categories })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    list
}