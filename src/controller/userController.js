const { User } = require("../model/user")
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const nodemailer = require('nodemailer')
const verifyEmail = (req, res) => {
    console.log("verifyEmail")
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            res.status(409).json({ status: 409, message: "email already exists" })
        } else {
            if (!validator.isEmail(req.body.email)) {
                res.status(400).json({ status: 400, message: "email malformed" })
            } else {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'salmenht10@gmail.com',
                        pass: 's123456789N'
                    }
                })
                const mailOptions = {
                    from: 'salmenht10@gmail.com',
                    to: req.body.email,
                    subject: 'Verification code',
                    text: 'your verification code is : ' + Math.floor(Math.random() * 9000 + 1000)
                }
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('Email sent: ' + info.response)
                    }
                })
            }
        }
    })
}
const signIn = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password).then((valid) => {
                if (!valid) {
                    res.status(401).json({ status: 401, message: "email or password is incorrect !" })
                } else {
                    let token = jwt.sign({ userId: user._id }, "5000", {
                        expiresIn: "246h",
                      })
                    res.status(201).json({ status: 201, data: user ,token:token})
                }
            }
            )
        } else {
            res.status(404).json({ status: 404, message: "email or password is incorrect !" })
        }
    }).catch((error) => {
        res.status(500).json({ status: 500, message: error.message })
    })
}


const signUp = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(409).json({ status: 409, message: "email already exists" })
            } else {
                if (!validator.isEmail(req.body.email)) {
                    res.status(400).json({ status: 400, message: "email malformed" })
                } else {
                    bcrypt
                        .hash(req.body.password, 10)
                        .then((hash) => {
                            let verificationCode = Math.floor(Math.random() * 9000 + 1000);
                            let userDetails = new User({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: hash,
                                verificationCode: verificationCode,
                            });
                            userDetails.save();
                        })
                        .then(() => {
                            res.status(201).json({ status: 201, message: "user created" });
                        })
                        .catch((error) => {
                            res.status(400).json({ status: 400, message: error.message });
                        });
                }
            }
        })
        .catch((error) => {
            res.status(500).json({ status: 500, message: error.message });
        });
};

const findUser = (req, res) => {
    User.findOne({ _id: req.params.userId }).then((user) => {
        if (user) {
            res.status(201).json({ status: 201, data: user })
        } else {
            res.status(404).json({ status: 404, message: "not found" })
        }
    }).catch(error => {
        res.status(500).json({ status: 500, message: error.message })
    })
}


const deleteAll = (req, res) => {
    User.find().then((users) => {
        if (users) {
            User.deleteMany().then(() => {
                res.status(200).json({ status: 200, message: "All users deleted" })
            }
            ).catch((error) => {
                res.status(500).json({ status: 500, message: error.message })
            })
        } else {
            res.status(200).json({ status: 200, message: "users already deleted" })
        }
    }).catch((error) => {
        res.status(500).json({ status: 500, message: error.message })
    })
}

const deleteUser = async (req, res) => {
    try {
        if (req.query.userId) {
            const user = await User.findOneAndDelete({ _id: req.query.userId })
            if (user) {
                return res.status(200).json({ status: 200, message: "user deleted" })
            }
            return res.status(404).json({ status: 404, message: "User Not Found !!!" })
        }
        res.status(500).json({ status: 500, message: "userId is required !!" })
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message })
    }
}


exports.deleteAll = deleteAll
exports.signIn = signIn
exports.signUp = signUp
exports.findUser = findUser
exports.deleteUser = deleteUser
exports.verifyEmail = verifyEmail

