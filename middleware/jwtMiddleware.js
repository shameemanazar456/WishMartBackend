const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    try{

        //console.log(req.headers);
        const token = req.headers['authorization'].split(' ')[1]
        console.log(token);
        console.log('response');
        const jwtresponse = jwt.verify(token,'supersecretkey')
        console.log('response');
        console.log(jwtresponse);
        req.payload = (jwtresponse.userId)
        next()
    }
    catch(error){
        //console.log(error);
        res.status(406).json('Unauthorised access')
    }
}

module.exports = jwtMiddleware