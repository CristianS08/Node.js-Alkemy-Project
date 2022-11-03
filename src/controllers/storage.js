const { matchedData } = require('express-validator');
const Storage = require('../models/mysql/storage');
const { handdleError } = require('../utils/handdleError');
const fs = require('fs');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de la base de datos
 */
const getItems = async (req, res) => {
    try {
        const data = await Storage.findAll({});
        res.send({data});
    } catch (err) {
        handdleError(res, 'ERROR_GET_ITEMS');
    }
}

/**
 * Obtener un detalle
 */
const getItem = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Storage.findByPk(id);
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_GET_ITEM'); 
    }
}
/**
 * Insertar un registro 
 */
const createItem = async (req, res) => {
    try {
        const {file} = req;

        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }

        const data = await Storage.create(fileData);
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_CREATE_ITEM');
    }
};

/**
 * Eliminar un registro de manera permanente
 */
const deleteItem = async (req, res) => {
    try {
        const {id} = req.params;
        const dataFile = await Storage.findByPk(id);

        await Storage.destroy({where: {id}});
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;

        fs.unlinkSync(filePath); 
        const data = {
            filePath,
            deleted: 1
        }
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_DELETE_ITEM'); 
    }
}

module.exports = {getItems, getItem, createItem, deleteItem};