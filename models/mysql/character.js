 const {sequelize} = require('../../config/mysql');
 const {DataTypes} = require('sequelize');
 const FilmModel = require('./film');

 const CharacterModel = sequelize.define(
    'character',
    {
        name: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.NUMBER,
        },
        weight: {
            type: DataTypes.NUMBER,
        },
        history: {
            type: DataTypes.STRING,
        },
        mediaId: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true,
        paranoid: true
    }
 );

CharacterModel.belongsToMany(FilmModel, {
    through: 'character_film',
    as: 'films'
});

/* CharacterModel.findOneData = function (id){   
    return CharacterModel.findAll({where: {id}, include:'films'});
}; */



 module.exports = CharacterModel;