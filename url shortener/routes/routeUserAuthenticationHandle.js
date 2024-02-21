const express = require('express');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const userRegistrationControl = require('../controllers/User/handleUserRegistration');
const userLoginControl = require('../controllers/User/handleUserLogin');
const { userUpdateControl } = require('../controllers/User/handleUserUpdate');
const userDeleteControl = require('../controllers/User/handleUserDelete');
const userLogoutControl = require('../controllers/User/handleUserLogout');
const userAuthenticationCheck = require('../middlewares/userAuthenticationCheck');

app.use(cookieParser()); //to parse cookies

//user registration
router.post('/register', userRegistrationControl);

//user login
router.post('/login', userLoginControl);

//user update
router.post('/update', userAuthenticationCheck, userUpdateControl);

//user delete
router.post('/delete', userAuthenticationCheck, userDeleteControl);

//user logout
router.get('/logout', userAuthenticationCheck, userLogoutControl);

module.exports = router;