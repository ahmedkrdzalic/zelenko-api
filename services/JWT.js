const {sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
    accessToken = sign( 
        {username: user.username, id: user.id},
        "MySecret"
    );

    return accessToken;
}

const validateToken = (req, res, next) => {
    const token = req.cookies["token"];

    if(!token) return res.status(400).json({error: "Unauthorized!"})
    
    try {
        const isValid = verify(token, "MySecret");
        //isValid is now resolved in object where it has values from cookie like username and id, we can store that 
        req.user = isValid;
        if(isValid) {
            req.authenticated = true;
            return next();
        }
    }
    catch(error) {
        res.status(400).json({error: error});
    }


}


module.exports = {createToken, validateToken};


