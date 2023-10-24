const cors = require('cors')

const express = require('express')
const app = express()

require('dotenv').config()
app.use(express.json())
app.use(cors())
var http = require('http')
const mongoose = require('mongoose')
var server = http.createServer(app)
const userRoutes = require('./src/routes/userRoutes')
const productRoutes = require('./src/routes/productRoutes')
const commandRoutes = require('./src/routes/commandRoutes')
const { normalizePort } = require('./src/common/common')
 
var port = normalizePort(process.env.PORT)

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection a Mongoose connection was established')

})
    .catch((err) => {
        console.log("Connection à MongoDB a échouée !", err.message)
    })
server.listen(port, () => console.log('Address du serveur : created successfully ! , port = ', port))
//app.listen(port,()=>console.log("Address du serveur : created successfully !"))

app.use('/', userRoutes)
app.use('/',productRoutes)
app.use('/', commandRoutes)