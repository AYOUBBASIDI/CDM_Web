//set routes here
const router = require('express').Router();
const auth = require('./auth/auth');
const register = require('./auth/register');
const refresh = require('./auth/refresh');
const logout = require('./auth/logout');
const getAgences = require('./api/agences.js');
const verifyJWT = require('../middleware/verifyJWT');
const transactions = require('./api/transactions.js');
const recharge = require('./api/recharge.js');
const activites = require('./api/activites.js');
const user = require('./api/user.js');
const download = require('./api/download.js');
const admin = require('./api/admin.js');
const checkToken = require('./auth/checkToken.js');

router.use('/auth', auth);
router.use('/register', register);
router.use('/refresh', refresh);
router.use('/logout', logout);
router.use('/agences', getAgences);
router.use('/download' , download);
router.use('/checkToken', checkToken);
router.use('/admin' , admin);

router.use(verifyJWT);
router.use('/transactions', transactions);
router.use('/recharge', recharge);
router.use('/activites' , activites);
router.use('/user' , user);


module.exports = router;
