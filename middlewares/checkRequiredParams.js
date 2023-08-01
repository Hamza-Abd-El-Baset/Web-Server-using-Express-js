module.exports = (requiredParams) => (req, res, next) => {
    const receivedParams = Object.keys(req.body)
    const missingParams = requiredParams.filter(param => {
        return ! receivedParams.includes(param)
    })
    
    if(missingParams.length) {
        const error = new Error('Missing required parameters')
        error.statusCode = 422
        error.message = missingParams.reduce((acc, param) => {
            acc[param] = {type: "required"}
            return acc
        }, {})
        return next(error)
    }

    else {
        next()
    }
     
}