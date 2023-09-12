const Sequelize = require('sequelize');

const sequelize = new Sequelize('ExpTracker-node-project', 'root', '246810', {
    dialect : 'mysql',
    host: 'localhost',
    timezone: '+05:30'
});

module.exports = sequelize;