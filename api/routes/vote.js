const { Router } = require('express')
const router = Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extends : false})
const votingOp = require('../../model/query/func.js')

router.post('/vote', urlencodedParser, (req, res) => {
  const choice = req.body.choice
  const userID = req.body.userID
  console.log(req.body)
  votingOp.select(userID, choice)
  res.end()
})

router.get('/getVoted', urlencodedParser, (req, res) => {
  const userID = req.query.userID
  votingOp.getChoice(userID).then(result => {
    res.status(200)
    res.send(result)
  })
  .catch(error => {
    res.status(200)
    res.send(-1)
  })
})

router.get('/getVoteResult', urlencodedParser, (req, res) => {
  const id = parseInt(req.query.id)
  votingOp.rate(id).then((result) => {
    res.status(200)
    res.json(result)
  })
})

module.exports = router