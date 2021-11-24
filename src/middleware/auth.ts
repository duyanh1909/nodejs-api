import jwt from 'jsonwebtoken';
// const util = require('util');
// const config = require('../config');
// const jwtVerify = util.promisify(jwt.verify);

export const authenticate = async (req, res, next) => {
	const token = req.headers.token;
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded)
        {
            return res.status(401).send({ message: 'Token is invalid' });
        }
        req.user = decoded; // payload
        return next();
    }
	catch(err){
        res.status(401).send({ message: "Not have a token"})
    }
};

export const authorize = async (req, res, next) => {
	if (req.user.userType == 'admin') {
        return next();
    }
    res.status(403).send({ message: 'You do not have permission' });
};