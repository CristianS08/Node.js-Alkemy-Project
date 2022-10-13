const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: '2h'
        }
    );
    return sign;
};

const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (err) {
        return null;
    }
};

module.exports = {tokenSign, verifyToken};