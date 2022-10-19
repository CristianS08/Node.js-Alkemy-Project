const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateItem = [
    check('title')
    .exists()
    .notEmpty()
    .isString(),
    check('creation_date')
    .exists()
    .notEmpty(),
    check('calification')
    .exists()
    .notEmpty()
    .isNumeric({min:1, max:5}),   
    check('mediaId')
    .exists()
    .notEmpty()
    .isNumeric(),
    check('genre_id')
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