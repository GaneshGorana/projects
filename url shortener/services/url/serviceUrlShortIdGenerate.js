const URL = require('../../models/urls');
const shortGen = require('shortid');
const { getUser, setUrl } = require('../../jwt/userAuthJwt');

async function urlShortIdGenerateService(req, res) {
    try {
        const user = getUser(req.cookies.uAuth);
        if (!user) return res.redirect('/login.html');
        const shortId = shortGen.generate();

        const returnData = await URL.create({
            shortId,
            redirectURL: req.body.redirectURL,
            visitHistory: 0,
            createdBy: user?._id,
        });
        const urlCookie = setUrl(returnData);
        res.cookie('url', urlCookie);
        res.redirect('/services/url');
    } catch (error) {
        console.log(error);
    }
}

module.exports = urlShortIdGenerateService;