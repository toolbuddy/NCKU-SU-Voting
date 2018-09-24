Sequelize = require('sequelize')
var config = require('../config');

db = {
    sequelize: new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize),
    models: {}
}

new Promise( (resolve, reject) => {
db.models.poll = db.sequelize.import('../model/poll.js')
db.models.psChart = db.sequelize.import('../model/psChart.js')
resolve();
})
.then( () => {
    for (var x in db.models) {
        if (db.models[x].hasOwnProperty('associate')) {
            console.log("[+] Associating " + x);
            db.models[x].associate(db.models);
        }
    }
});

module.exports = db;
