const FilmModel = require('../models/mysql/film');
const GenreModel = require('../models/mysql/genre');
const Storage = require('../models/mysql/storage');
const {handdleError} = require('../utils/handdleError');

const getGenres = async (req, res) => {
    try {
        const data = await GenreModel.findAll({
            include:[
                {
                    model: Storage, 
                    as: 'image',
                    attributes: ['url', 'filename']
                }
            ],
            attributes: ['name']
        });
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_GET_GENRES', )
    }
};


/**
 * Get genre 's detail
 * @param {*} req 
 * @param {*} res 
 */
const getGenre = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await GenreModel.findAll({
            where: {id}, 
            include:{
                model: FilmModel, 
                as: 'films',
                attributes: ['title', 'creation_date', 'calification']
            },
            attributes: ['name']
        });

        if(!data){
            handdleError(res, 'NOT_FOUND', 404);
            return;
        };

        res.send({data});
    } catch (err) {
        console.log({err});
        handdleError(res, 'ERROR_GET_GENRE', );
    }
};

/**
 * Create genre
 * @param {*} req 
 * @param {*} res 
 */
const createGenre = async (req, res) => {
    try {
        const {body} = req;
        const data = await GenreModel.create(body);
        res.send(data);
    } catch (err) {
        console.log({err});
        handdleError(res, 'ERROR_CREATE_GENRE');
    }
};

/**
 * update a genre
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateGenre = async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;

        const foundData = await GenreModel.findByPk(id);
        if(!foundData){
            handdleError(res, 'NOT_FOUND', 404);
            return;
        };
        if(name) foundData.name = name;

        const data = await foundData.save();
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_UPDATE_GENRE');
    }
};

/**
 * Soft delete genre
 * @param {*} req 
 * @param {*} res 
 */
const deleteGenre = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await GenreModel.destroy({ where: {id} });
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_DELETE_GENRE');
    }
};

module.exports = {getGenres, getGenre, createGenre, updateGenre, deleteGenre};