const { Router } = require('express')
const router = Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extends : false})
const votingOp = require('../../model/query/func.js')

router.post('/Voting',urlencodedParser,(req,res)=>{
  let choice = req.body.name
  let id = req.body.id
  votingOp.select(id,choice)
  res.end()
})

module.exports = router