const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.get('/testUsers', (req,res)=>{
    res.json({
        msg: 'Hello Users'
    })
})

//register user
router.post('/register', (req,res)=>{
    User.findOne({
        email: req.body.email
    })
    .then((user)=>{
        if (user) {
            return res.status(400).json({msg:'A user is already registered with this email'});
        } else {
            
            //create new user
            const newUser = new User({
                handle: req.body.handle,
                email: req.body.email,
                password: req.body.password
            })

            //hash the password

            bcrypt.genSalt((err,salt)=>{
                bcrypt.hash(newUser.password, salt,(err,hash)=>{
                    newUser.password = hash;
                    newUser.save()
                    .then((user)=>{
                        res.json(user)
                    })
                    .catch(err => console.log(err));

                })
            })

        }
    })
})


//login user

router.post('/login', (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email
    })
    .then(user => {
        if (!user) {
            return res.status(404).json({
                email: 'This email is not registered'
            })
        }

        // compare password

        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if (isMatch) {
                return res.status(200).json({
                    msg: 'Success!!'
                })
            } else {
                return res.status(400).json({
                    password: 'Incorrect Password!'
                })
            }
        })
    })
})

module.exports = router;