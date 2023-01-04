const Account = require('../../models/accountModel');
const User = require('../../models/usersModel');

const getAllTransactions = async (req, res) => {
    //getUsers
    try {
        const users = await User.find().select('nom prenom identifiant');
        const transactions = [];
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const account = await Account
                .findOne({ identifiant: user.identifiant })
                .select('transactions');
            const data = account.transactions;
            data.forEach(d => {
                const tran = {
                    object: d.object,
                    amount: d.montant,
                    date: d.date,
                    type: d.type,
                    user: user
                }
                transactions.push(tran);
            }
            );
        }
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = { getAllTransactions , getAllUsers};
