const { getUser } = require('../jwt/userAuthJwt');
async function userAuthenticationCheck(req, res, next) {
    try {
        if (req.headers['authorization']) {
            const authToken = req.headers['authorization']?.split(' ')[1].toString();
            const user = getUser(authToken);
            if (!authToken || !user) return res.redirect('/login.html');
            req.user = user;
            return next();
        }

        const authToken = req.cookies.uAuth; //user's _id

        const user = getUser(authToken);

        if (!authToken || !user) return res.redirect('/login.html');

        req.user = user;
        next();

    } catch (err) {
        console.log(err);
    }
}

module.exports = userAuthenticationCheck;