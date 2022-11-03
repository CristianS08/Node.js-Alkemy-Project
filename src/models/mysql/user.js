const {sequelize} = require('../../../config/mysql');
const {DataTypes, Model} = require('sequelize');

/* const UserModel = sequelize.define(
    'user',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.NUMBER
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM(['user', 'admin']),
            defaultValue:'user'
        }
    },
    {
        timestamps: true
    }
); */

class UserModel extends Model{};
UserModel.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM(['user', 'admin']),
            defaultValue:'user'
        }
    },
    {
        sequelize,
        modelName: 'user',
        timestamps: true
    }
)

module.exports = UserModel;