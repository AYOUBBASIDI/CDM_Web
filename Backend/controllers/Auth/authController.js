"use strict";
const Users = require('../../models/usersModel.js');
const Account = require('../../models/accountModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { identifiant, password } = req.body;
    if (!identifiant || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await Users.findOne({identifiant : identifiant});

    // Check if user exists
    if (foundUser.length === 0) return res.status(200).json({ 'message': 'No account'});

    //Cechk if user admin or client
    if (foundUser.role === 'admin') {
        res.json({ 'message': 'Welcome Admin' });
    }else{
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            // create JWTs
            const accessToken = jwt.sign(
                { "cin": foundUser.cin },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            const refreshToken = jwt.sign(
                { "cin": foundUser.cin },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            await Users.updateOne({ cin: foundUser.cin}, { refreshToken: refreshToken });
            // get satatus of account
            const account = await Account.findOne({ identifiant: foundUser.identifiant });
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken , user: foundUser , account: account});
        } else {
            res.status(200).json({ 'message': 'Wrong password'});
        } 
    }

    
}

module.exports = { handleLogin };