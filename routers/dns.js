const express = require('express')

const router = express.Router()
const dns = require('dns')



router.get('/:domain', (req,res,next)=>{
    //throw new Error("Error 1")
    dns.resolve(req.params.domain, (err, records)=>{
        if(err) {
            err.statusCode = 404
            err.message = 'Domain not found'
            return next(err)
        }
        else {
            console.log(records)
            res.send(records)
            // req.records = records
            // next()
        }
    })
})


router.use((err, req, res, next) =>{
    console.error(err)
    err.statusCode = err.statusCode || 500
    const handledError = err.statusCode < 500
    res.status(err.statusCode)
    .send({
        message : handledError ? err.message : 'Something went wrong'
    })
})

module.exports = router