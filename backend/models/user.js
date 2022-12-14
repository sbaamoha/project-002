const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
       type: String,
       required: true, 
    }
})

userSchema.statics.signup = async function(email, password) {
    try {
        const alreadyExist = await this.findOne({email})
        if(!email | !password){
            throw new Error('please fill all data')
        }else{
            if(alreadyExist){
                throw new Error('email already in use')
            }
            const salt = await bcrypt.genSalt(10)
            const bcryptedPassword = await bcrypt.hash(password, salt)
            const user = await this.create({email, password: bcryptedPassword})
            return user
    }
    } catch (error) {
        return {msg: error.message}
    }
}
userSchema.statics.login = async function(email,password) {
    try {
        if(!email | !password){
            throw new Error('please fill all the data')
        }
        const user = await this.findOne({email})
        if(!user){
            throw new Error('Incorrect email')
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw new Error('Incorrect password')
        }
        return user
    } catch (error) {
        return {msg: error.message}
    }
}

module.exports = mongoose.model('User', userSchema)