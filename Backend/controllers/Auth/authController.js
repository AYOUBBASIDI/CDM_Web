"use strict";
const Users = require('../../models/usersModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { identifiant, password } = req.body;
    if (!identifiant || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await Users.find({identifiant : identifiant});

    // Check if user exists
    if (foundUser.length === 0) return res.sendStatus(401);

    //Cechk if user admin or client
    if (foundUser[0].role === 'admin') {
        res.json({ 'message': 'Welcome Admin' });
    }else{
        const match = await bcrypt.compare(password, foundUser[0].password);
        if (match) {
            // create JWTs
            const accessToken = jwt.sign(
                { "cin": foundUser.cin },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            );
            const refreshToken = jwt.sign(
                { "cin": foundUser.cin },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            await Users.updateOne({ cin: foundUser[0].cin}, { refreshToken: refreshToken });
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        } else {
            res.sendStatus(401);
        } 
    }

    
}

module.exports = { handleLogin };