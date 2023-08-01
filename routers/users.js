const express = require('express')
const CustomError = require('../helpers/CustomError')
const _ = require('lodash')
const User = require('../models/user')
const { appendFile } = require('fs')
const router = express.Router()

const {check, query, validationResult} = require('express-validator')



// /**
//  * 
//  * @param {*} asyncRouter 
//  * @returns 
//  */
// const asyncRouterWrapper = (asyncRouter) => async (req, res, next) => {
//     try {
//         await asyncRouter(req, res, next)
//     }
//     catch(err) {
//         next(err)
//     }
// }



//Middleware
const checkRequiredParams = require('../middlewares/checkRequiredParams')
const authentication = require('../middlewares/authentication')
const validateRequest = require('../middlewares/validateRequest')



//create

//using async & await
router.post('/',
    [
    checkRequiredParams(['username', 'password', 'age']),
    check('username').isEmail(),
    check('password').isLength({min: 5})
    ],
    async (req, res, next) => {

            
        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
              throw new CustomError('User or Password is not valid', 422, errors.mapped())
        }
            
            

        const createdUser = new User({
            username: req.body.username,
            age: req.body.age,
            password: req.body.password
        })
    
        const user = await createdUser.save()
        res.send(`saved user is: ${user}`)
        
        next()
    })


//using then and catch
/*
router.post('/',(req, res, next) => {
    const createdUser = new User(req.body)
    createdUser.save()
    .then( user => {
        res.send(`saved user is: ${user}`)
    })
    .catch( err => { 
        err.statusCode = 422;
        next(err)
    })
})
*/

//Login
router.post('/login',
checkRequiredParams(['username', 'password']),
async (req, res, next) => {

    const user = await User.findOne({username: req.body.username})
    if( !user) {
        /*
        const error = new Error("Invalid username or password")
        error.statusCode = 401
        throw error
        */
        throw new CustomError("Invalid username or password", 401)
    }
    else {
        
        const isMatch = await user.checkPassword(req.body.password)
    
        if(isMatch) {
            const token = await user.generateToken()
            res.send({
                user,
                token,
                message: `User logged in successfully`
            })
        }
        
        else {
            const error = new Error("Invalid username or password")
            error.statusCode = 401
            throw error
        }
        
    }


    
    
})


//read
router.get('/profile', authentication,
(req, res, next) => {
    res.send(req.user)
})

//read
router.get('/',(req,res)=>{
    User.find({})
    .then(data => {
        res.send(data)
    })
    .catch(err => console.error(err))
})

//update
router.patch('/:id',(req,res)=>{
    
})

//delete
router.delete('/:id',(req,res)=>{
    
})

//error handler
router.use((err, req, res, next) =>{
    console.error(err)
    err.statusCode = err.statusCode || 500
    const handledError = err.statusCode < 500
    res.status(err.statusCode)
    .send({
        message : handledError ? err.message : 'Something went wrong',
        errors: handledError ? err.errors : ""
    })
})



module.exports = router

