const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.get('/testUsers', (req,res)=>{
    res.json({
        msg: 'Hello Users'
    })
})


router.post('/register', (req,res)=>{
    // check if there is already a user with this email
    User.findOne({email: req.body.email})
    .then(user =>{
        if (user) {
            return res.status.apply(400).json({
                email: "A user has already registered with this email"
            })
        }
        else{
            //create new user and add it to the DB
            const newUser = new User({
                handle: req.body.handle,
                email: req.body.email,
                password: req.body.password
            })

            // hash the password
        }
    })
    
})


module.exports = router;