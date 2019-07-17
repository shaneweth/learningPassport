const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Loading Input Validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User Model

const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // form validation

    const { errors, isValid } = validateRegisterInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });


            // Hash password before sending to DB

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT
// @access Public
router.post("/login", (req, res) => {
    // Form Validation

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email

    User.findOne({ email }).then(user => {
        // check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // user matched
                // create jwt payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 10000
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password Incorrect" });
            }
        })
    })
})

module.exports = router;