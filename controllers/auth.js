const UserModel = require('../models/mysql/user');
const {encrypt, compare} = require('../utils/handlePassword.js');
const { tokenSign } = require('../utils/handleJwt');
const {handdleError} = require('../utils/handdleError');
const sendMail = require('../config/emailer');

const registerCtrl = async (req, res) =>{
    try {
        const password = await encrypt(req.body.password);
        const body = {...req.body, password};
        const dataUser = await UserModel.create(body);
        
        dataUser.set('password', undefined, {strict: false});

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        };

        sendMail(dataUser);
        res.send({data});
    } catch (error) {
        console.log(error);
        handdleError(res, 'ERROR_REGISTER_USER', 400);
    }
};

const loginCtrl = async (req, res) => {
    try {
        const user = await UserModel.findOne({where: {email: req.body.email}}); 
        
        if(!user){
            handdleError(res, 'USER_NOT_EXIST', 404);
            return;
        };

        const hashPassword = user.password;
        const check = await compare(req.body.password, hashPassword);

        if(!check){
            handdleError(res, 'PASSWORD_INVALID', 401);
            return;
        };

        user.set('password', undefined, {strict: false});

        const data = {
            token: await tokenSign(user),
            user
        };

        res.send({data});
    
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_LOGIN_USER', 400);
    }
}

module.exports = {registerCtrl, loginCtrl};