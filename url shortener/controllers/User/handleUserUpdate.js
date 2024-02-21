const mongoose = require('mongoose');
const User = require('../../models/users');
const { setUser, getUser } = require('../../jwt/userAuthJwt');

//user update page render
async function userUpdatePageRender(req, res) {
    const user = getUser(req.cookies.uAuth);
    res.render('userInfoUpdate.ejs', { user });
}

//user update
async function userUpdateControl(req, res) {
    const { _id } = getUser(req.cookies.uAuth);
    try {
        const updatedUserInfo = { ...req.body };
        const ObjectId = mongoose.Types.ObjectId;
        await User.findOneAndUpdate({ _id: new ObjectId(_id) }, updatedUserInfo, { new: true });
        const updateTokenCookie = { ...updatedUserInfo, _id };
        res.clearCookie('uAuth');
        res.clearCookie('url');
        const updateToken = setUser(updateTokenCookie);
        res.cookie('uAuth', updateToken);
        return res.redirect('/services/url');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { userUpdateControl, userUpdatePageRender };