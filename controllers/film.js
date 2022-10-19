const FilmModel = require('../models/mysql/film');
const {matchedData} = require('express-validator');
const {handdleError} = require('../utils/handdleError');
const GenreModel = require('../models/mysql/genre');
const Storage = require('../models/mysql/storage');
const CharacterModel = require('../models/mysql/character');

/**
 * List films
 * @param {*} req 
 * @param {*} res 
 */
const getFilms = async (req, res) => {
    try {
        const data = await FilmModel.findAll({
            include:[{
                model: Storage, 
                as: 'image',
                attributes: ['url', 'filename']
            }],
            attributes: ['title', 'creation_date']
        });

        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_GET_FILMS', 400)
    }
};


/**
 * Get film 's detail
 * @param {*} req 
 * @param {*} res 
 */
const getFilm = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await FilmModel.findAll({
            where: {id}, 
            include:[{
                model: CharacterModel, 
                as: 'characters',
                attributes: ['name', 'age', 'weight', 'history']
            }],
            attributes: ['title', 'creation_date', 'calification']
        });

        if(!data){
            handdleError(res, 'NOT_FOUND', 404);
            return;
        };

        res.send({data});
    } catch (err) {
        console.log({err});
        handdleError(res, 'ERROR_GET_FILM', 400);
    }
};

/**
 * Create film
 * @param {*} req 
 * @param {*} res 
 */
const createFilm = async (req, res) => {
    try {
        const {body} = req;
        const data = await FilmModel.create(body, {include: {model: CharacterModel, as:'characters'}});
        res.send(data);
    } catch (err) {
        console.log({err});
        handdleError(res, 'ERROR_CREATE_FILM', 400);
    }
};

/**
 * update a film
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateFilm = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, creation_date, calification, mediaId, genre_id} = req.body;

        
        const foundData = await FilmModel.findByPk(id);
        if(!foundData){
            handdleError(res, 'NOT_FOUND', 404);
            return;
        };
        if(title) foundData.title = title;
        if(creation_date) foundData.creation_date = creation_date;
        if(calification) foundData.calification = calification;
        if(mediaId) foundData.mediaId = mediaId;
        if(genre_id) foundData.genre_id = genre_id;

        const data = await foundData.save();
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_UPDATE_FILM', 400);
    }
};

/**
 * Soft delete film
 * @param {*} req 
 * @param {*} res 
 */
const deleteFilm = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await FilmModel.destroy({ where: {id} });
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_DELETE_FILM');
    }
};

module.exports = {getFilms, getFilm, createFilm, updateFilm, deleteFilm};