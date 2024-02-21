function userLogoutControl(req, res) {
    res.clearCookie('uAuth');
    res.clearCookie('url');
    res.redirect('/');
}

module.exports = userLogoutControl;