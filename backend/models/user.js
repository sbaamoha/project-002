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
    const alreadyExist = await this.findOne({email})
    if(alreadyExist){
        throw Error('email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const bcryptedPassword = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: bcryptedPassword})
    return user
}


module.exports = mongoose.model('User', userSchema)