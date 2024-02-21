const URL = require('../../models/urls');
const mongoose = require('mongoose');
const { getUser } = require('../../jwt/userAuthJwt');

//url analytics service
async function urlAnalyticsService(req, res) {
    try {
        const user = req.user;
        const uId = user?._id.toString();
        const ObjectId = mongoose.Types.ObjectId;
        const urlData = await URL.find({ createdBy: new ObjectId(uId) });
        res.json(urlData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('URL Diagnostic Error');
    }
}

async function urlAnalyticsPageRender(req, res) {
    try {

        const urlOfAnalytics = `${req.protocol}://${req.get('host')}/api/url/analytics`;
        const userToken = req.cookies.uAuth;
        const user = getUser(userToken);
        const returnData = await fetch(urlOfAnalytics, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${userToken}`,
            },
        });
        const urlData = await returnData.json();
        res.clearCookie('url');
        res.render('urlAnalytics.ejs', { user, urlData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('URL Diagnostic Error');
    }
}

module.exports = { urlAnalyticsService, urlAnalyticsPageRender };