const express = require('express')

const router = express.Router()

//create
router.post('/',(req,res)=>{

})

//read
router.get('/',(req,res)=>{
    res.send("from todo router")
})

router.get('/:id',(req,res)=>{
    res.send("from todo router")
})

//update
router.patch('/:id',(req,res)=>{
    
})

//delete
router.delete('/:id',(req,res)=>{
    
})


module.exports = router