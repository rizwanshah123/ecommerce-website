const path = require('path');

const db = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop-database', 'root', 'pakhyr12345', {
    host: 'localhost',
    dialect: 'mysql',

});

const pool = db.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'pakhyr12345',
        database: 'shop-database'
    }
).promise();

module.exports = {
    pool: pool,
    dirName: path.dirname(require.main.filename),
    sequelize: sequelize
};