const User = require('../../models/users');

//user registration
async function userRegistrationControl(req, res) {
    try {
        await User.create({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
        });
        return res.redirect('/login.html');
    } catch (error) {
        console.log(error);
        return res.json({ err: error });
    }

}

module.exports = userRegistrationControl;