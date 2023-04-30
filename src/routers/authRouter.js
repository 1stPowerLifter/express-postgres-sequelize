const express = require('express');
const { AuthControllers } = require('../controllers');
const { auth } = require('../middlewares');
const { validation } = require('../middlewares');
const { userSchemas } = require('../schemas');

const router = express.Router();

router.post('/register', validation(userSchemas.user), AuthControllers.register);
router.post('/login', validation(userSchemas.userLogin), AuthControllers.login);
router.post('/refresh', validation(userSchemas.userRefresh), AuthControllers.refresh);
router.get('/logout', auth, AuthControllers.logout);
router.get('/login/google', AuthControllers.loginGoogle);
router.get('/oauth/google', AuthControllers.oAuthGoogle);
router.get('/login/facebook', AuthControllers.loginFacebook);
router.get('/oauth/facebook', AuthControllers.oAuthFacebook);
router.post('/verification-number', validation(userSchemas.userPhoneNumber), AuthControllers.verificationNumber);
router.post('/otp', validation(userSchemas.userOtp), AuthControllers.verifyOTP);

module.exports = router;
