"use strict";
const Users = require('../../models/usersModel.js');

const handleCheck = async (req, res) => {
    const { token , cin } = req.body;
    const User = await Users.findOne({ cin: cin });
    if (!User) return res.status(400).json({ 'message': 'User not found.' });
    if(User.token !== token) return res.status(400).json({ 'message': 'Token is not valid.' });
    const newtoken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
    await Users.updateOne({ cin: foundUser.cin }, { $set: { token: newtoken } });
    res.status(200).json({ 'message': 'Token is valid.' });

}

module.exports = { handleCheck };

