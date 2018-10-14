const db = require('../sqldb')
const poll = db.models.poll
const Op = db.sequelize.Op

function select(name, choices) {

  choices.forEach( choice => {
    const type = parseInt(choice/3)
    console.log(type)

    // 檢查有沒有投過
    check(name, type)
      .then( () => {
        db.sequelize.transaction( t => {
          poll.create({
            name: name,
            choice: choice
          })
        })
      })
  })
}
/* example
select('xxxaba', [6, 11])
*/

function getChoice(name) {
  return new Promise( (resolve, reject) => {
    poll.findAll({where: {name:name}})
      .then( res => {
        ret = []
        res.forEach( ele => {
          ret.push(ele.getDataValue('choice'))
        })
        resolve(ret)
      })
  })
}
/* example
getChoice('xxxaba')
.then( res => {
  console.log(res)
})
*/

function check(name, type) {
  console.log(type*3)
  console.log(type*3+2)
  console.log("-----------------")
  return new Promise( (resolve, reject) => {
    poll.findOne({
      where: {
        choice: {
          [Op.between]: [type*3, type*3+2]
        },
        name: name
      }
    })
      .then( res => {
        if (res == null) resolve(true)
        else reject(false)
      })
  })
}
/* example: type 的範圍是0~4
check('xxxaba', 3) 
.then( res => {
  console.log(res)
})
.catch( err => {
  console.log(err)
})
*/

function sum(id) {
  if (id<0 || id>14) {
    return new Promise( (resolve, reject) => { reject("invalid id")});
  }
  return poll.count({where:{choice: id}})
}
/* example
sum(1)
.then( res => {
  console.log(res)
})
.catch( err => {
  console.log(err)
});
*/

function rate(id, type) {
  if (id<0 || id>14) {
    return new Promise( (resolve, reject) => { reject("invalid id")});
  }

  let s = sum(id)
  let a = poll.count({
    where: {
        choice: {
          [Op.between]: [type*3, type*3+2]
        }
      }
  })

  return new Promise( (resolve, reject) => {
    Promise.all([s, a])
      .then( x => {
        resolve(x[0]/x[1])
      })
  })
}

/* example
rate(1)
.then( res => { console.log(res)})
*/
module.exports = {
  select,
  getChoice,
  check,
  sum,
  rate,
}
