const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const secerate_key = 'SECERATE_KEY';
const User = require('../models/user');

exports.register = async function(req, res) {
  try {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.send('Email already exists' );
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });  
        bcrypt.genSalt(10, (err, salt) => {  
          bcrypt.hash(newUser.password, salt, (err, hash) => {  
            if (err) throw err;  
            newUser.password = hash;  
            newUser.save()  
              .then(user => res.send({"user":user, "message":"User registerd sucessfully"}));
          });  
        });  
      }  
    });
  } catch (error) {
    res.send(error)
  }
}

exports.login = async function(req, res){
  try {    
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.send( 'User not found');
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        console.log(user)
        const payload = { id: user._id, name: user.name };
        jwt.sign(payload, secerate_key, { expiresIn: 3600 }, (err, token) => {
          res.send({
            "success": true,
            "token": token,
            "message": "User login sucessfully"
          });
        });
      } else {
        return res.send('Password incorrect');
      }
    });
  });
  } catch (error) {
    res.send(error)
  }
}