
const {validationResult} = require('express-validator')

module.exports = validateRequest = (validatorsArray) => 
async (req, res, next) => {
    
    const promises = validatorsArray.map(validator => validator.run(req))
    await Promise.all(promises)
     
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
          throw new CustomError('User or Password is not valid', 422, errors.mapped())
    }
      
    next()
 }
 
 