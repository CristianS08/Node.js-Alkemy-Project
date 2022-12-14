const {Sequelize} = require('sequelize');

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;


const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect: 'mysql'
    }
);

const dbConnectMySql = async () => {
    try {
        await sequelize.sync({force: false});
        console.log('***Successfull database conection***');
    } catch (err) {
        console.log('***Database conection error***', err);
    }
};

module.exports = {sequelize, dbConnectMySql};