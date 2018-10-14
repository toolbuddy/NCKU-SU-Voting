const { Router } = require('express')
const router = Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extends : false})
const votingOp = require('../../model/query/func.js')

router.post('/vote', urlencodedParser, (req, res) => {
  let choice = Object.values(JSON.parse(req.body.choice))
  const userID = req.body.userID
  votingOp.select(userID, choice)
  res.end()
})

router.get('/getVoted', urlencodedParser, (req, res) => {
  const userID = req.query.userID
  votingOp.getChoice(userID).then(result => {
    res.status(200)
    res.send(JSON.stringify(result))
    res.end()
  })
  .catch(error => {
    res.status(200)
    res.send('-1')
    res.end()
  })
})

router.get('/getVoteResult', urlencodedParser, (req, res) => {
  const id = parseInt(req.query.id)
  const type = parseInt(req.query.type)
  const data = {}
  votingOp.rate(id, type).then((result) => {
    votingOp.sum(id).then((result2) => {
      data.rate = result
      data.number = result2
      console.log(data)
      res.status(200)
      res.json(data)
    })
  })
})

module.exports = router
