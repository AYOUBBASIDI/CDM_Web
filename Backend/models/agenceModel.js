const mongoose = require('mongoose');

const AgenceSchema = mongoose.Schema({
    nom : {
        type : String,
        required: true
    },
    adresse : {
        type : String,
        required: true
    },
    tel : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    ville : {
        type : String,
        required: true
    }
});

module.exports = mongoose.model('Agences',AgenceSchema)