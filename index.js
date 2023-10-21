const { port } = require('./config')
port = 3000
const express = require("express")
const cors = require('cors')
require('express-async-errors')

require('./mongoDbConnect')

const app = express()

const userRouter = require('./routers/users')
const todoRouter = require('./routers/todo')
const DNSRouter = require('./routers/dns')
const { onRequest } = require('firebase-functions/v1/https')

const functions = requirie("firebase-functions")

app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(express.json())
app.use(cors())

app.get('/', (req,res,next)=>{
    res.send("Hello")
})

//handling request on users
app.use(['/user', '/users'], userRouter)
app.use('/todo', todoRouter)
console.log(todoRouter.toString())
app.use('/dns', DNSRouter)


app.listen(port, () => {
    console.info(`Server is now listening on port ${port}`)
})

exports.api = functions.https.onRequest(app)

