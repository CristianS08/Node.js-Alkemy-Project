const FilmModel = require('../models/mysql/film');
const {matchedData} = require('express-validator');
const {handdleError} = require('../utils/handdleError');

/**
 * List films
 * @param {*} req 
 * @param {*} res 
 */
const getFilms = async (req, res) => {
    try {
        const data = await FilmModel.findAll();
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_GET_FILMS', )
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
        const data = await FilmModel.findAll({where: {id}, include: 'character_film'});
        if(!data){
            handdleError(res, 'NOT_FOUND', 404);
            return;
        }
        res.send({data});
    } catch (err) {
        console.log({err});
        handdleError(res, 'ERROR_GET_FILM', );
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
        const data = await FilmModel.create(body, {include: 'characters'});
        res.send(data);
    } catch (err) {
        console.log({err});
        handdleError(res, 'ERROR_CREATE_CHARACTER');
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
        const {title, creation_date, calification} = req.body;

        
        const foundData = await FilmModel.findByPk(id);
        if(!foundData){
            handdleError(res, 'NOT_FOUND', 404);
            return;
        };
        if(title) foundData.title = title;
        if(creation_date) foundData.creation_date = creation_date;
        if(calification) foundData.calification = calification;

        const data = await foundData.save();
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_UPDATE_CHARACTER');
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
        handdleError(res, 'ERROR_DELETE_CHARACTER');
    }
};

module.exports = {getFilms, getFilm, createFilm, updateFilm, deleteFilm};