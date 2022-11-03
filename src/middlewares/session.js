const { handdleError } = require('../utils/handdleError');
const {verifyToken} = require('../utils/handleJwt');
const {UserModel} = require('../models/mysql/user');


const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            handdleError(res, 'NOT_TOKEN', 401);
            return;
        }

        const token = req.headers.authorization.split(' ').pop(); 
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handdleError(res, 'NOT_PAYLOAD_DATA', 401);
            return;
        };

        next();
    } catch (err) {
        handdleError(res, 'NOT_SESSION', 401);
    }
};

module.exports = {authMiddleware};