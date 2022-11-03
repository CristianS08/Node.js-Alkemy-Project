 const {sequelize} = require('../../../config/mysql');
 const {DataTypes, Model} = require('sequelize');
 const Character_film = require('./character_film');
 const Storage = require('./storage');

/*  const CharacterModel = sequelize.define(
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
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: true,
        paranoid: true
    }
 );
 */

class CharacterModel extends Model{}
CharacterModel.init(
    {
        name: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        weight: {
            type: DataTypes.FLOAT,
        },
        history: {
            type: DataTypes.STRING,
        },
        mediaId: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'character',
        timestamps: true,
        paranoid: true
    }
)

/* CharacterModel.hasMany(Character_film);

CharacterModel.belongsTo(Storage, {
    foreignKey: 'mediaId',
    as: 'image'
}); */

/* CharacterModel.findOneData = function (id){   
    return CharacterModel.findAll({where: {id}, include:'films'});
}; */



 module.exports = CharacterModel;