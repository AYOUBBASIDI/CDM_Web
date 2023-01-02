//set routes here
const router = require('express').Router();
const auth = require('./auth');
const register = require('./register');
const refresh = require('./refresh');
const logout = require('./logout');
const employees = require('./api/employees');
const verifyJWT = require('../middleware/verifyJWT');

router.use('/auth', auth);
router.use('/register', register);
router.use('/refresh', refresh);
router.use('/logout', logout);

router.use(verifyJWT);
router.use('/employees', employees);

module.exports = router;
