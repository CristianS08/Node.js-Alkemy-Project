/* const {sequelize} = require('../../config/mysql');
const {DataTypes} = require('sequelize');
const CharacterModel = require('./character');
const FilmModel = require('./film');

const Character_film = sequelize.define(
    'character_film',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);


module.exports = Character_film; */