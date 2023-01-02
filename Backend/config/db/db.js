const mongoose = require('mongoose');
const {MONGO_USER, MONGO_PASS, MONGO_DBNAME } = process.env;
const MONGODB_URI = `mongodb+srv://bsddb:1ubzJ7bnPu9yJ1rK@cluster0.eoqwdpr.mongodb.net/cdm`;


const connectDB = async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(
        MONGODB_URI,{ useNewUrlParser: true }, () => 
            console.log('connected to db')
    );
};

module.exports = connectDB;
