const sequelize = require('../utils/path').sequelize;
const Sequelize = require('sequelize');


const User = sequelize.define('User', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },


})


module.exports = User;