const CharacterModel = require('../models/mysql/character');
const Storage = require('../models/mysql/storage');
const FilmModel = require('../models/mysql/film');
const {handdleError} = require('../utils/handdleError');

/**
 * List characters
 * @param {*} req 
 * @param {*} res 
 */
const getCharacters = async (req, res) => {
    try {
        //const filters = req.query;

        const data = await CharacterModel.findAll({
            include:[{
                model: Storage, 
                as: 'image',
                attributes: ['url', 'filename']
            }],
            attributes: ['name']
        });

/*         const filteredData = data.filter((character) => {
            let isvalid = true;
            for (let key in filters) {
                isvalid = isvalid && character[key] === [key];
            };
            return isvalid;
        }); */
        //console.log({filteredData});
        res.send({data});

        

        /* console.log('getCharacters');
        const data = await characterModel.findAll(); */
        
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_GET_CHARACTERS', )
    }
};


/**
 * Get character 's detail
 * @param {*} req 
 * @param {*} res 
 */
const getCharacter = async (req, res) => {
    try {
        const { id } = req.params;

        const data = CharacterModel.findAll({
            where: {id}, 
            include:[
                {
                    model: FilmModel,
                    as: 'films',
                    attributes: ['title', 'creation_date', 'calification']
                }
            ],
            attributes: ['name', 'age', 'weight', 'history']
        });

        if(!data){
            handdleError(res, 'NOT_FOUND', 404);
            return;
        }
        
        res.send({data});
    } catch (err) {
        console.log({err});
        handdleError(res, 'ERROR_GET_CHARACTER', );
    }
};

/**
 * Create character with respective films
 * @param {*} req 
 * @param {*} res 
 */
const createCharacter = async (req, res) => {
    try {
        const {body} = req;
        const data = await CharacterModel.create(body, {include: {model: FilmModel, as:'films'}} );
        res.send(data);
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_CREATE_CHARACTER');
    }
};

/**
 * update a Character
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateCharacter = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, age, weight, history, mediaId} = req.body;

        
        const foundData = await CharacterModel.findByPk(id);
        if(!foundData){
            handdleError(res, 'NOT_FOUND', 404);
            return;
        };
        if(name) foundData.name = name;
        if(age) foundData.age = age;
        if(weight) foundData.weight = weight;
        if(history) foundData.history = history;
        if(mediaId) foundData.mediaId = mediaId;

        const data = await foundData.save();
        res.send({data});
    } catch (err) {
        console.log(err);
        handdleError(res, 'ERROR_UPDATE_CHARACTER');
    }
};

/**
 * Soft delete character
 * @param {*} req 
 * @param {*} res 
 */
const deleteCharacter = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await CharacterModel.destroy({ where: {id} });
        res.send({data});
    } catch (err) {
        handdleError(res, 'ERROR_DELETE_CHARACTER');
    }
};



module.exports = {getCharacters, createCharacter, getCharacter, updateCharacter, deleteCharacter};
