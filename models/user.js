const mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const util = require('util')
const signJWT = util.promisify(jwt.sign)
const verifyJWT = util.promisify(jwt.verify)

const {saltRounds, jwtSecret} = require('../config')

/*
const myToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTZjZGEwMGExMjQ2OTRjM2VlYWVlNiIsImlhdCI6MTY4OTIzNzI4NCwiZXhwIjoxNjg5MjM3NDA0fQ.3CbfY6T-tPR9sGY0eBrjpEtjC8hABRBATRedA_KRk3Y"

verifyJWT(myToken, jwtSecret)
.then(payload => {
    console.log(payload)
})
.catch(err => {
    console.error(err)
})
*/

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        index: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: "usersCollection",
    toJSON: {
        transform: (doc, ret) => _.omit(ret, ['__v', 'password'])
    }

})

schema.pre('save', async function () {
    const currentDocument = this
    if(currentDocument.isModified("password")) {
        //const salt = await bcrypt.genSalt(saltRounds)
        currentDocument.password = await bcrypt.hash(currentDocument.password, saltRounds)
    }
} )

schema.methods.checkPassword = function(plainPassword) {
    const currentDocument = this
    return bcrypt.compare(plainPassword, currentDocument.password)
}
// I don't need to use async before function //why?
//when I return a promise, any one can await this promise

schema.methods.generateToken = function() {
    const currentDocument = this
    return signJWT({id: currentDocument.id}, jwtSecret, {expiresIn: "1h"})
}

schema.statics.getUserFromToken = async function(token) {
    const User = this
    const {id} = await verifyJWT(token, jwtSecret)

    const user = await User.findById(id)
    return user
} 

const User = mongoose.model('User', schema)

User.on('index', (err) => {
    if(err)
    console.log(`Error while creating User Index: ${err}`)
})

module.exports = User