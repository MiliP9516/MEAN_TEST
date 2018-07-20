const express = require('express');
const router = express.Router();
const mongooes = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

router.post('/signup', function(req, res){
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err){
            return res.status(500).json({
                error: err
            });
        }
        else{
            const user = new User({
                _id: new mongooes.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            // token
            var token = jwt.sign({id:user._id },'secret',{expiresIn:'1h'})
            user.save().then(function(result){
                console.log(result);
                res.status(200).json({
                    sucess: 'New user has been created',
                    token: token
                });
            }).catch(error =>{
                res.status(500).json({
                    error: err
                });
            });
        }
    });
});

router.post('/signin', function(req, res){
    User.findOne({email: req.body.email})
    .exec()
    .then(function(user){
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if(err){
                return res.status(401).json({
                    failed: 'Unathorized Access'
                });
            }
            if(result){
                var token = jwt.sign({
                    email: user.email,
                    _id: user.id
                },
                'secret',{
                    expiresIn: '1h'
                });
                return res.status(200).json({
                    sucess: 'Successfully Sign In to mean-secure',
                    token: token
                });
            }
            return res.status(401).json({
                failed: 'Unautorized Access'
            });
        });
    })
    .catch(error =>{
        res.status(500).json({
            error:error
        });
    });
});
module.exports = router;