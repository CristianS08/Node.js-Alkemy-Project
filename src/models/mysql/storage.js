const {sequelize} = require('../../../config/mysql');
const {DataTypes, Model} = require('sequelize');

/* const Storage = sequelize.define(
    'storage',
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }
); */

class Storage extends Model{};
Storage.init(
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'storage',
        timestamps: true
    }
)

module.exports = Storage;