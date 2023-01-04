const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options = require('../../helpers/options');
const Account = require('../../models/accountModel');
const User = require('../../models/usersModel');
const open = require('open');


const downloadRB = async (req, res) => {
        const html = fs.readFileSync(path.join(__dirname, '../helpers/template.html'), 'utf-8');
        const filename = Math.random() + '_doc' + '.pdf';
        let array = [];

    try {
        const user = await User.findOne({_id: req.params.id});
        const transactions = await Account.findOne({identifiant: user.identifiant}).select('transactions');
        const balance = await Account.findOne({identifiant: user.identifiant}).select('balance');
        const data = transactions.transactions;
        data.forEach(d => {
            const tran = {
                object : d.object,
                amount : d.montant,
                date : d.date,
                type : d.type,
            }
            array.push(tran);
        });

        const fullDate = getDate();

        const obj = {
            transactions: array,
            balance: balance.balance,
            client :{
                identifiant: user.identifiant,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                tel: user.tel
            },
            date: fullDate
        }

        const document = {
            html: html,
            data: {
                releveBancaire: obj
            },
            path: './docs/' + filename
        }

        pdf.create(document, options)
            .then(res => {
                // download file now
                open(document.path);
                //delete file after download
                setTimeout(() => {
                    fs.unlinkSync(document
                        .path);
                }, 10000);
            }).catch(error => {
                console.log(error);
            });
            res.json({message: 'success'});

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

        

    
        
        
        
}


function getDate() {
    var date = new Date();
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var monthNames = [
        "Janvier", "Février", "Mars",
        "Avril", "Mai", "Juin", "Juillet",
        "Août", "Septembre", "Octobre",
        "Novembre", "Décembre"
    ];
    var monthIndex = date.getMonth();
    var monthName = monthNames[monthIndex];
    var fullDate = day + ' ' + monthName + ' ' + year + ' ' + hours + ':' + minutes;
    return fullDate;
}

module.exports = { downloadRB };