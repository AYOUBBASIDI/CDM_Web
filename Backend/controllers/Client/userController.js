const Account = require('../../models/accountModel');
const User = require('../../models/usersModel');
const bcrypt = require('bcrypt');

const getActivites = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        const activites = await Account.findOne({identifiant: user.identifiant}).select('transactions');
        res.json(activites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getData = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        const balance = await Account.findOne({identifiant: user.identifiant}).select('balance');
        res.json({user, balance});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateData = async (req, res) => {
    //get data posted
    const { nom, prenom, email, password, tel , address, agence } = req.body;
    //check if all data are provided
    if (!nom || !prenom || !email || !password || !tel || !address || !agence) return res.status(400).json({ 'message': 'All information are required.' });
    //check if the user exists
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json({ 'message': 'User not found.' });
    //check if the email is already used
    const duplicate = await User.countDocuments({
        $and: [{ _id: { $ne: req.params.id } }, { email: email }]
    });
    if (duplicate) return res.status(409).json({ 'message': 'Email already used.' });
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    //update the user
    try {
        await User.updateOne({ _id: req.params.id }, {
            $set: {
                nom: nom,
                prenom: prenom,
                email: email,
                password: hashedPwd,
                tel: tel,
                address: address,
                agence: agence
            }
        });
        res.status(200).json({ 'message': 'User updated successfully.' });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const disableAccount = async (req, res) => {
    try {
        await Account.updateOne({ identifiant: req.params.identifiant }, {
            $set: {
                status: 'disabled'
            }
        });
        res.status(200).json({ 'message': 'Account disabled successfully.' });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const enableAccount = async (req, res) => {
    try {
        await Account.updateOne({ identifiant: req.params.identifiant }, {
            $set: {
                status: 'active'
            }
        });
        res.status(200).json({ 'message': 'Account enabled successfully.' });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}









module.exports = { getActivites , getData , updateData , disableAccount , enableAccount };


