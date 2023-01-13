const Account = require('../../models/accountModel.js');
const bcrypt = require('bcrypt');
const User = require('../../models/usersModel.js');

const handleRecharge = async (req, res) => {
    try {
        const { sender, receiver, amount, password } = req.body;
        const senderAccount = await Account.findOne({ identifiant: sender })
        const senderUser = await User.findOne({identifiant: sender})    

        if (!senderAccount) {
            return res.status(400).json({ message: 'Account not found' });
        }

        const match = await bcrypt.compare(password, senderUser.password);
        if (!match) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (senderAccount.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        const newSenderBalance = senderAccount.balance - amount;
        await
            Account.updateOne({ identifiant: sender }, { balance: newSenderBalance });
        
            const date = new Date();
            const day = date.getDay();
            const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
            const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            const currentDate = days[day] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();

        const senderTransaction = {
            object: receiver,
            type : "Recharge",
            montant: amount,
            date: currentDate,
            status : "Payé"
        };

        await Account.updateOne({ identifiant: sender }, { $push: { transactions: senderTransaction } });
        res.status(200).json({ message: 'Transfer successful' });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleRecharge };





