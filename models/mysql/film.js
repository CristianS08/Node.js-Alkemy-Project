const {sequelize} = require('../../config/mysql');
const {DataTypes} = require('sequelize');
const CharacterModel = require('./character');

const FilmModel = sequelize.define(
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
           type: DataTypes.STRING
       }
   },
   {
       timestamps: true,
       paranoid: true
   }
);

/* FilmModel.belongsToMany(CharacterModel, {
    through: 'character_film',
    as: 'characters'
}); */

module.exports = FilmModel;