const passport = require('passport')
const  Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('./models/user');

module.exports = function (passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
  opts.secretOrKey = 'SECERATE_KEY';
  console.log("passporttt")
  console.log(opts)
  passport.use(new Strategy(opts, async (jwt_payload, done) => {
    console.log("jwt pay")
    console.log(jwt_payload)
    try {
      const user = await User.findById(jwt_payload.id)
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch {
      return done(error, false)
    }
  }));
};

