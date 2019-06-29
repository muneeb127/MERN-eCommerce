const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Loading Users
const User = require('../../models/User');

//Loading validation function
const validateRegisterInput = require('../../validation/register.js');
const validateLoginInput = require('../../validation/login.js');

//@route GET api/user/test
//@desc Test user route
//@access public

router.get('/test', (req, res) => {
    res.json({
        msg: "users works"
    })
});


//@route POST api/user/register
//@desc Register user
//@access public
router.post('/register', (req, res) => {
    // res.json({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    };

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    msg: 'Email already exists'
                });
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
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                });
            }
        })
});

//@route POST api/users/login
//@desc Login user / Returning JWT token
//@access public

router.post('/login', (req, res) => {
    // const user = req.body;
    // res.json(user);

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email 
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    msg: 'User not found'
                });
            }

            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //User matches
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }

                        jwt.sign(payload, keys.secretOrKey, {
                            expiresIn: 3600
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                    } else {
                        res.status(400).json({
                            msg: 'Password incorrect'
                        })
                    }
                })
        });
});

//@route /api/users/current
//@desc Show current users
//@access Private

router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;