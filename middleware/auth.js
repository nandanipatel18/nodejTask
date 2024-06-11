const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('../passport')(passport)
const jwt = require('jsonwebtoken');
jwtSecretKey = 'SECERATE_KEY'

const authenticate = (req, res, next) => {
    console.log("authentication called")
    console.log(req.header)

    try {
        console.log("userrr")
        console.log(req.headers)
        const token = req.headers.authorization;
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
           req.user = verified
           next();
        }
        else{
            return res.send("Unauthorised user")
        }
        // passport.authenticate('jwt', { session: false }, (err, user, info) => {
        //     console.log(user)
        //     console.log(info)
        //     if (err) {
        //         console.log(err)
        //         return res.send(err)
        //     }
        //     if (!user) {
        //         return res.send("Unauthorised user")
        //     }
        //     req.user = user;
        //     next();
        // })

    } catch (error) {
        return res.send(error)
    }

}

module.exports = authenticate;