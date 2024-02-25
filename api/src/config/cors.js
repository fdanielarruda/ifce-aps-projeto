const cors = require('cors');

const corsConfig = cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
})

module.exports = corsConfig