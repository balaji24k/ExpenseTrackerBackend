const Sequelize = require('sequelize');

const sequelize = new Sequelize('ExpTracker-node-project', 'root', '246810', {
    dialect : 'mysql',
    host: 'localhost'
});

module.exports = sequelize;