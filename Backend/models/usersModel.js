const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nom : {
        type : String,
        required: true
    },
    prenom : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    tel : {
        type : String,
        required: true
    },
    cin : {
        type : String,
        required: true
    },
    agence : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    identifiant : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    type : {
        type : String,
        required: true
    },
    role : {
        type : String,
        required: true
    },
    token : {
        type : String,
    },
    refreshToken : {
        type : String,
    }
})


module.exports = mongoose.model('Users',UserSchema)