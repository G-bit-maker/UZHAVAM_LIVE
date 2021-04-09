const config = require("../config");
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization failed' });
    }
    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
}