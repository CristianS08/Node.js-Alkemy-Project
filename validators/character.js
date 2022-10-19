const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateItem = [
    check('name')
    .exists()
    .notEmpty()
    .isString(),
    check('age')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('weight')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('history')
    .exists()
    .notEmpty()
    .isString(),
    check('mediaId')
    .exists()
    .notEmpty()
    .isNumeric(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetItem = [
    
    check('id')
    .exists()
    .notEmpty()
    .isNumeric(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = {validatorCreateItem, validatorGetItem};