const Account = require('../../models/accountModel.js');
const bcrypt = require('bcrypt');
const User = require('../../models/usersModel.js');

const handleTransfer = async (req, res) => {
    try {
        const { sender, receiver, amount, password } = req.body;
        const senderAccount = await Account.findOne({ identifiant: sender })
        const senderUser = await User.findOne({identifiant: sender})   
        const receiverAccount = await Account.findOne({ identifiant: receiver })
        const receiverUser = await User.findOne({identifiant: receiver})  

        //check if sender account and receiver account exist
        if (!senderAccount || !receiverAccount) {
            return res.status(400).json({ message: 'Account not found' });
        }

        //check if sender account and receiver account are the same
        if(senderAccount.identifiant == receiverAccount.identifiant){
            return res.status(400).json({ message: 'You can not transfer to the same account' });
        }

        //check if sender account disabeled or not
        if(senderAccount.status == "Disabled"){
            return res.status(400).json({ message: 'Account is disabled' });
        }
        //check if receiver account disabeled or not
        if(receiverAccount.status == "Disabled"){
            return res.status(400).json({ message: 'Account is disabled' });
        }

        const match = await bcrypt.compare(password, senderUser.password);
        if (!match) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (senderAccount.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        const newSenderBalance = senderAccount.balance - amount;
        const newReceiverBalance = receiverAccount.balance + amount;
        await
            Account.updateOne({ identifiant: sender }, { balance: newSenderBalance });
        await
            Account.updateOne({ identifiant: receiver }, { balance: newReceiverBalance });
        

        const senderTransaction = {
            object: receiverUser.nom+" "+receiverUser.prenom,
            type : "Paiement à",
            montant: amount,
            date: Date.now(),
            status : "Payé"
        };
        const receiverTransaction = {
            object: senderUser.nom+" "+senderUser.prenom,
            type : "Paiement de",
            montant: amount,
            date: Date.now(),
            status : "Payé"
        };

        await Account.updateOne({ identifiant: sender }, { $push: { transactions: senderTransaction } });
        await Account.updateOne({ identifiant: receiver }, { $push: { transactions: receiverTransaction } });
        res.status(200).json({ message: 'Transfer successful' });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleTransfer };





