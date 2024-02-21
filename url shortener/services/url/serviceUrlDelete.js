const URL = require('../../models/urls');

//url delete page rander
function urlDeletePageRender(req, res) {
    const user = req.user;
    res.render('urlDelete.ejs', { user });
}

//url delete
async function urlDeleteService(req, res) {
    try {
        const shortId = req.body.shortId;
        const returnData = await URL.findOneAndDelete({ shortId });
        if (!returnData) return res.json({ error: 'deleteion error' });
        res.clearCookie('url');
        res.redirect('/services/url');

    } catch (error) {
        console.log(error.message);
    }

}

module.exports = { urlDeletePageRender, urlDeleteService };