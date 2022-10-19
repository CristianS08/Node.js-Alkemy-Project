/**
 * send response, error message, error code
 * @param res 
 * @param message 
 * @param code 
 */
const handdleError = (res, message, code = 400) => {
    res.status(code);
    res.send({error: message});
};

module.exports = {handdleError};