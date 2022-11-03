const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require('../validators/storage');
const {createItem, getItem, getItems, deleteItem} = require('../controllers/storage');
const {authMiddleware} = require('../middlewares/session');

router.post('/', uploadMiddleware.single('myfile'), authMiddleware, createItem);


router.get('/', authMiddleware, getItems);


router.get('/:id', validatorGetItem, authMiddleware, getItem);


router.delete('/:id', validatorGetItem, authMiddleware, deleteItem);

module.exports = router;