"use strict";
const Users = require('../../models/usersModel.js');

const handleCheck = async (req, res) => {
    const { token , cin } = req.body;
    const User = await Users.findOne({ cin: 'ADMIN1' });
    if (!User) return res.status(400).json({ 'message': 'User not found.' });
    if(User.token !== token) return res.status(400).json({ 'message': 'Token is not valid.' });
    
    try {
        await Users.updateOne({ cin: 'ADMIN1' }, {
            $set: {
                token: token
            }
        });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
    res.status(200).json({ 'message': 'Token is valid.' });

}

module.exports = { handleCheck };

