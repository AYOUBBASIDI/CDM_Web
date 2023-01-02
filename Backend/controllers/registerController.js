"use strict";
const Users = require('../models/usersModel.js');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd, email } = req.body;
    if (!user || !pwd || !email) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await Users.count({user : user});
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = new Users({
            user: user,
            email: email,
            pwd: hashedPwd
        });
        newUser.save();
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports = { handleNewUser };