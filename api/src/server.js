const app = require('express')()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config()

const routes = require('./routes')
const corsConfig = require('./config/cors')

app.use(corsConfig)
app.use(bodyParser.json())
app.use(routes)

server.listen(process.env.API_PORT || 8000)