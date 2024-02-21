const express = require('express');
const router = express.Router();

//main service page render
const mainServicePageRenderControl = require('../controllers/MainServicePage/handleMainServicePageRender');

//url pages render [analytics,delete]
const { urlAnalyticsPageRender } = require('../services/url/serviceUrlAnalytics');
const { urlDeletePageRender } = require('../services/url/serviceUrlDelete');

//user pages render [update,delete,logout]
const { userUpdatePageRender } = require('../controllers/User/handleUserUpdate');
const userLogoutControl = require('../controllers/User/handleUserLogout');

//url related
router.get('/url', mainServicePageRenderControl);
router.get('/url/analytics', urlAnalyticsPageRender);
router.get('/url/delete', urlDeletePageRender);

//user related
router.get('/user');
router.get('/user/update', userUpdatePageRender);
router.get('/user/delete');
router.get('/user/logout', userLogoutControl);

module.exports = router;


