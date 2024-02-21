const User = require('../../models/users');
const { getUser } = require('../../jwt/userAuthJwt');
//user delete
async function userDeleteControl(req, res) {
    try {
        const { _id } = getUser(req.cookies.uAuth);
        const user = await User.findOneAndDelete({ _id });
        if (!user) return res.status(400).json({ err: 'User not found' });
        res.clearCookie('uAuth');
        res.clearCookie('url');
        res.redirect('/index.html');
    } catch (error) {
        console.log(error);
    }
}

module.exports = userDeleteControl;