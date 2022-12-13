const mongoose = require('mongoose')
const User = require('../models/user')

const loginUser = async (req,res) => {
    const {email, password} = req.body
    const request = await User.findOne({email: email})
    if(!request){
        return res.status(400).json({msg: 'user not found'})
    }
    res.status(200).json(request)
}

const signupUser = async (req, res) => {
    const {email, password} = req.body
    const request = await User.signup(email, password)
    if(!request){
        return res.status(400).json({msg: 'failed to signup'})
    }
    res.status(200).json(request)
}

module.exports = {
    loginUser,
    signupUser
}