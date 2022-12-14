const mongoose = require('mongoose')
const User = require('../models/user')

const loginUser = async (req,res) => {
    const {email, password} = req.body
    const request = await User.login(email,password)
    if(!request.email){
        return res.status(400).json(request)
    }
    res.status(200).json(request)
}

const signupUser = async (req, res) => {
    const {email, password} = req.body
    if(!email | !password){
        return res.status(400).json({msg: 'please fill all inputs'})
    }
    const request = await User.signup(email, password)
    if(!request.email){
        return res.status(400).json({msg: request})
    }
    res.status(200).json(request)
}

module.exports = {
    loginUser,
    signupUser
}