const { Router } = require('express')
const router = Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extends : false})
const votingOp = require('../../model/query/func.js')

router.post('/getSum',urlencodedParser,(req,res)=>{
  let number = req.body.number
  sum = votingOp.sum(number)
  res.send(`number ${number} get: `,sum)
})

module.exports = router