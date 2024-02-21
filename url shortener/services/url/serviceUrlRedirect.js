const URL = require('../../models/urls');
async function urlRedirectService(req, res) {
    const shortId = req.params.shortID;
    const returnData = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $inc: { visitHistory: 1, }
        })

    res.redirect(returnData?.redirectURL);
}

module.exports = urlRedirectService;