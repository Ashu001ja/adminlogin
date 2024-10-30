const express = require('express');
const router = express.Router();
const {AdminSignup,AdminLogin,GetProfule,ChangePassword}=require('../controller/controller');

router.route('/adminsignup').post(AdminSignup);
router.route('/adminlogin').post(AdminLogin);
router.route('/:email').get(GetProfule);
router.route('/changepassword').post(ChangePassword);

module.exports = router;