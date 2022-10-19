const {sequelize} = require('../../config/mysql');
const {DataTypes, Model} = require('sequelize');
const Storage = require('./storage');
const GenreModel = require('./genre');
const Character_film = require('./character_film');

/* const FilmModel = sequelize.define(
   'film',
   {
       title: {
           type: DataTypes.STRING,
           allowNull: false
       },
       creation_date: {
           type: DataTypes.DATE
       },
       calification: {
           type: DataTypes.NUMBER
       },
       mediaId: {
           type: DataTypes.INTEGER
       }
   },
   {
       timestamps: true,
       paranoid: true
   }
); */

class FilmModel extends Model{};
FilmModel.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        creation_date: {
            type: DataTypes.DATE
        },
        calification: {
            type: DataTypes.INTEGER
        },
        mediaId: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'film',
        timestamps: true,
        paranoid: true
    }
)

/* FilmModel.belongsTo(Storage, {
    foreignKey: 'mediaId',
    as: 'image'
});

FilmModel.hasMany(GenreModel, {
    foreignKey: 'film_id',
    as: 'genres'
});

FilmModel.hasMany(Character_film, {
    foreignKey: 'film_id'
}); */

/* FilmModel.belongsToMany(CharacterModel, {
    through: 'character_film',
    foreignKey: 'film_id',
    as: 'characters'
}); */

module.exports = FilmModel;