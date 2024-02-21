const User = require('../../models/users');
const { setUser } = require('../../jwt/userAuthJwt');

//user login
async function userLoginControl(req, res) {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName, password });
        if (!user) return res.status(400).json({ err: 'User not found' });

        //set jwt token
        const LoginToken = setUser(user);
        res.cookie('uAuth', LoginToken);
        res.redirect('/services/url');
    } catch (error) {
        console.log(error);
    }
}

module.exports = userLoginControl;