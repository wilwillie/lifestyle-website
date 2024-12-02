const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ success: false, message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Menyimpan informasi pengguna ke dalam request
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
    }
};