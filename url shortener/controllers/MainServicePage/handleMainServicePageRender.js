const { getUrl } = require('../../jwt/userAuthJwt');

//render main service page to client
function mainServicePageRenderControl(req, res) {
    try {
        const user = req.user;
        const urlCookie = req.cookies.url;
        const urlShowData = getUrl(urlCookie);
        if (!user) return res.redirect('/login.html');
        res.render('servicePage.ejs', { user, urlShowData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Main Server Error');
    }
}

module.exports = mainServicePageRenderControl;