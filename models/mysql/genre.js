const {sequelize} = require('../../config/mysql');
const {DataTypes} = require('sequelize');

const GenreModel = sequelize.define(
   'genre',
   {
       name: {
           type: DataTypes.STRING,
           allowNull: false
       },
       mediaId: {
           type: DataTypes.STRING
       }
   },
   {
       timestamps: true
   }
);

module.exports = GenreModel;