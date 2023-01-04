"use strict";
const Users = require('../../models/usersModel.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Account = require('../../models/accountModel.js');

const handleNewUser = async (req, res) => {
    const { nom, prenom, email, tel, cin, agence, address, role, type } = req.body;
    if (!nom || !prenom || !email || !tel || !cin || !agence || !address ) return res.status(400).json({ 'message': 'All information are required.' });
    // check for duplicate usernames in the db
    const duplicate = await Users.countDocuments({
        $or: [{ cin: cin }, { email: email }]
      });      
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        // const hashedPwd = await bcrypt.hash(pwd, 10);
        const password = generatePassword();
        const hashedPwd = await bcrypt.hash(password, 10);
        //generate identifiant and check for duplicate
        let identifiant = generateIdentifiant();
        let duplicateIdentifiant = await Account.countDocuments({ identifiant: identifiant });
        while (duplicateIdentifiant) {
            identifiant = generateIdentifiant();
            duplicateIdentifiant = await Account.countDocuments({ identifiant: identifiant });
        }
        //store the new user
        const newUser = new Users({
            nom: nom,
            prenom: prenom,
            email: email,
            tel: tel,
            cin: cin,
            agence: agence,
            address: address,
            identifiant: identifiant,
            password: hashedPwd,
            type: type,
            role: role
        });
        newUser.save();
        // sendEmail(nom, prenom, email, identifiant, password);
        const newAccount = new Account({
            identifiant: identifiant,
            balance: 100,
            transactions: [],
            status: 'active'
        });
        newAccount.save();
        res.status(201).json({ 'success': `New user ${nom} ${prenom} created! , identifiant = ${identifiant} , password = ${password}` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const generatePassword = () => {
    let password = "";
    for (let i = 0; i < 6; i++) {
      password += Math.floor(Math.random() * 10);
    }
    return password;
}

const generateIdentifiant = () => {
    let identifiant = "";
    for (let i = 0; i < 10; i++) {
      identifiant += Math.floor(Math.random() * 10);
    }
    return identifiant;
}

const sendEmail = async (nom, prenom, email, identifiant, password) => {
    const htmlMail = getEmail(nom, prenom, identifiant, password);
    let mailTransporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
     
    let mailDetails = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Credit Du Maroc Support',
        html: htmlMail,
    };
     
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs',err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

const getEmail = (nom, prenom, identifiant, password) => {
    return `
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
        <!-- 100% body table -->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <a href="http://ayoubbasidi.me/" title="logo" target="_blank">
                                <img width="100" src="https://seeklogo.com/images/C/credit-du-maroc-logo-80D6D85982-seeklogo.com.png" title="logo" alt="logo">
                            </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Commencer
                                            </h1>
                                            <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                                Bonjour ${nom} ${prenom}<br/> Votre compte a été créé sur Banc Credit Du Maroc . Vous trouverez ci-dessous les informations d'identification générées par votre système, <br><strong>Veuillez modifier le mot de passe immédiatement après la connexion</strong>.</p>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p
                                                style="color:#455056; font-size:18px;line-height:20px; margin:0; font-weight: 500;">
                                                <strong
                                                    style="display: block;font-size: 13px; margin: 0 0 4px; color:rgba(0,0,0,.64); font-weight:normal;">Identifiant</strong>${identifiant}
                                                <strong
                                                    style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Mot de passe</strong><span style="background: #B5DEFF;position: absolute;width: 20%;height: 100%;top: 0;left: 40%; font-size: 15px; cursor: pointer; color: #0071CE;" onclick="copyPassword()" id="copier">Copier</span><input style='opacity:0;' value="${password}" id="pwd" hidden>
                                            </p>

                                            <a href="http://ayoubbasidi.me/"
                                                style="background:#0071CE;text-decoration:none !important; display:inline-block; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                                Login to your Account</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.creditdumaroc.com</strong> </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <script>
            function copyPassword() {
            const pwd = document.getElementById("pwd");
            pwd.select();
            document.execCommand("copy");
            const copier = document.getElementById("copier");
                copier.innerHTML = "Copié";
            }
        </script>
    </body>
    `
}


module.exports = { handleNewUser };