const sqldb = require('./sqldb');

sqldb.sequelize.sync({force: true})
.then(() => {
    console.log("[+] Database sync successfully");
})
.catch( err => {
    console.log("[!] Error in sync.js");
    console.log(err);
});
