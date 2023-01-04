const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    identifiant : { 
        type : String,
        required: true
    },
    balance : {
        type : Number,
        required: true
    },
    transactions : {
        type : Array,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Accounts',AccountSchema)