const jwt = require('jsonwebtoken');
const secKey = 'this is secret key.'

function setUser(user) {
    if (!user) return null;
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        password: user.password,
    };
    return jwt.sign(payload, secKey);
}
function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secKey);
    } catch (error) {
        console.log("error in jwt", error);
    }
}
function setUrl(url) {
    if (!url) return null;
    const payload = {
        shortId: url.shortId,
        redirectURL: url.redirectURL,
    };
    return jwt.sign(payload, secKey);
}
function getUrl(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secKey);
    } catch (error) {
        console.log("error in jwt", error);
    }
}

module.exports = {
    setUser,
    getUser,
    setUrl,
    getUrl,
}