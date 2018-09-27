const db = require('../sqldb')
const poll = db.models.poll
const student = db.models.student
const psChart = db.models.psChart

// 同意: 投票對象, 投票人
function pollAgree(name, id) {
  isPolled(name, id)
  .then( res => {
    if (!res) {
      db.sequelize.transaction( t => {
      poll.findById(name)
      .then( res => {
          res.increment('number')
        })
      })

      pollReject(name, id)
    }
  })
}

/* example
pollAgree("1", 18128277933);
*/

// 否決: 投票對象, 投票人
function pollReject(name, id) {
  db.sequelize.transaction( t => {
    psChart.create({
      pollName: name,
      studentId: id
    })
  });
}
/* example
pollReject("2", 1828933);
*/

// 檢查有沒有投過: 投票對象，投票人
// 回傳值： [Promise] null/instance，建議用 if(null) 判斷就好
function isPolled(name, id) {
  return psChart.findOne({
    where: {
      pollName: name,
      studentId: id
    }
  })
}
/* example
isPolled("1", 199292)
.then( res => { if (!res) ...})
*/

// 得票數： 投票對象
function getNumber(name) {
  return new Promise( (resolve, reject) => {
    poll.findById(name)
    .then( res => {
      resolve(res.getDataValue('number'))
    })
  });
}
/* example
getNumber("1")
.then( res => {
    console.log("Number = " + res);
});
*/

// 新增投票對象
function createPoll(name) {
  db.sequelize.transaction( t => {
    poll.create({
      name: name
    })
  });
}

/* example
createPoll("1");
createPoll("2");
createPoll("3");
*/

module.exports = {
  pollAgree: pollAgree,
  pollReject: pollReject,
  isPolled: isPolled,
  getNumber: getNumber
}
