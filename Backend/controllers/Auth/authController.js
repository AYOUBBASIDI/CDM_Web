"use strict";
const Users = require('../../models/usersModel.js');
const Account = require('../../models/accountModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { identifiant, password } = req.body;
    if (!identifiant || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await Users.findOne({identifiant : identifiant});

    // Check if user exists
    if (foundUser.length === 0) return res.status(200).json({ 'message': 'No account'});

    //Cechk if user admin or client
    if (foundUser.role === 'Admin') {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
        //insert token in db
        const tokenUpdate = await Users.updateOne({ cin: foundUser.cin }, {
            $set: {
                token: token
            }
        });
        console.log(tokenUpdate)
        //send mail to admin
        sendAdminMail(foundUser.email, token);
        res.json({ 'message': 'Welcome Admin' });
    }else{
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            // create JWTs
            const accessToken = jwt.sign(
                { "cin": foundUser.cin },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            const refreshToken = jwt.sign(
                { "cin": foundUser.cin },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            await Users.updateOne({ cin: foundUser.cin}, { refreshToken: refreshToken });
            // get satatus of account
            const account = await Account.findOne({ identifiant: foundUser.identifiant });
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken , user: foundUser , account: account});
        } else {
            res.status(200).json({ 'message': 'Wrong password'});
        } 
    }

    
}

const sendAdminMail = (email,token) => {
    const htmlMail = getEmail(token);
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
        subject: 'Welcome again Sir',
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

const getEmail = (token) => {
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
                                <a href="http://localhost:3000" title="logo" target="_blank">
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
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Welcome Again Sir
                                            </h1>
                                            <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                                Click the <strong>Admin Login</strong> Button To Redirect to your panel</p><br/>
                                            <a href="http://localhost:3001/access/${token}"
                                                style="background:#0071CE;text-decoration:none !important; display:inline-block; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                                Login to your Panel</a>
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
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>http://localstorage:3000</strong> </p>
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


module.exports = { handleLogin };