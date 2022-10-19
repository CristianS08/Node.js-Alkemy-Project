const {sequelize} = require('../../config/mysql');
const {DataTypes, Model} = require('sequelize');
const Storage = require('./storage');
const FilmModel = require('./film');

/* const GenreModel = sequelize.define(
   'genre',
   {
       name: {
           type: DataTypes.STRING,
           allowNull: false
       },
       mediaId: {
           type: DataTypes.INTEGER
       },
       film_id: {
        type: DataTypes.INTEGER
       }
   },
   {
       timestamps: true,
       paranoid: true
   }
); */

class GenreModel extends Model{};
GenreModel.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mediaId: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'genre',
        timestamps: true,
        paranoid: true
    }
);

/* GenreModel.belongsTo(Storage, {
    foreignKey: 'mediaId',
    as: 'image'
}); */

/* GenreModel.belongsTo(FilmModel, {
    foreignKey: 'film_id',
    as: 'film'
}); */

module.exports = GenreModel;