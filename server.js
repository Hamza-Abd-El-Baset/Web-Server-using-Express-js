const { port } = require('./config')

const express = require("express")
require('express-async-errors')

require('./mongoDbConnect')

const app = express()

const userRouter = require('./routers/users')
const todoRouter = require('./routers/todo')
const DNSRouter = require('./routers/dns')

app.use(express.json())

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