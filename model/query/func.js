const db = require('../sqldb')
const poll = db.models.poll

function select(name, choice) {
  return new Promise( (resolve, reject) => {
    isFinished(name)
    .then( finish => {
      if (finish) {
        reject("You have selected before");
      }

      db.sequelize.transaction( t => {
        poll.create({
          name: name,
          choice: choice
        })
        .then( res => {
          resolve('user '+res.getDataValue('name')+' select '+res.getDataValue('choice'))
        })
      })
    })
  })
}
/* example
select('xxxaga', 1)
.then( res => {
  console.log(res)
})
.catch( err => {
  console.log(err)
})
*/

function isFinished(name) {
  return poll.findById(name);
}
/* example: null=沒投過
isFinished('ggg')
.then( res => {
  console.log(res);
})
*/

function sum(id) {
  if (id<0 || id>=18) {
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

function rate(id) {
  if (id<0 || id>=18) {
    return new Promise( (resolve, reject) => { reject("invalid id")});
  }

  let s = sum(id)
	let a = poll.count()

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
