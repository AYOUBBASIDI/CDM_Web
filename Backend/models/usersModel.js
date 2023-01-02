const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    pwd : {
        type : String,
        required: true
    },
    refreshToken : {
        type : String,
    },
})


module.exports = mongoose.model('Users',UserSchema)