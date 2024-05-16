const Sequelize = require('sequelize');
const sequelize = require('../utils/path');


const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date:{
        type:Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }

})


module.exports = Order;