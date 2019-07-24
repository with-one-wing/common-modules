const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) => {
    if (!req.headers) {
        req.status = 400;
        next(new Error('Req is invalid object'));
    }
    if (!req.headers.authorization) {
        req.status = 401;
        next(new Error('Token is not provided'));
    }
    try {
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch(err) {
        req.status = 401;
        next(err);
    }
}