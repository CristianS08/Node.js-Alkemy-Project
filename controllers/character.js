const CharacterModel = require('../models/mysql/character');
const {handdleError} = require('../utils/handdleError');

/**
 * List characters
 * @param {*} req 
 * @param {*} res 
 */
const getCharacters = async (req, res) => {
    try {
        const filters = req.query;
        const data = await characterModel.findAll();

        const filteredData = data.filter((character) => {
            let isvalid = true;
            for (let key in filters) {
                isvalid = isvalid && character[key] === [key];
            };
            return isvalid;
        });
        console.log({filteredData});
        res.send({filteredData});

        

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
        const data = CharacterModel.findAll({where: {id}, include:'films'});
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
        const data = await CharacterModel.create(body, {include: 'films'} );
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
        const {name, age, weight, history} = req.body;

        
        const foundData = await CharacterModel.findByPk(id);
        if(!foundData){
            handdleError(res, 'NOT_FOUND', 404);
            return;
        };
        if(name) foundData.name = name;
        if(age) foundData.age = age;
        if(weight) foundData.weight = weight;
        if(history) foundData.history = history;

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
