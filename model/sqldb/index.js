Sequelize = require('sequelize')
var config = require('../config');

db = {
    sequelize: new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize),
    models: {}
}

db.models.poll = db.sequelize.import('../model/poll.js')

module.exports = db;
