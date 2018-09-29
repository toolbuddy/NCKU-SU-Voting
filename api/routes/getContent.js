const { Router } = require('express')
const router = Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extends: false })

const data = require('../../model/text.json')

router.get('/getContent', urlencodedParser, (req, res) => {
  const id = parseInt(req.query.id)
  console.log(id)
  res.status(200)
  res.json(data[`proposal_${id}`])
})

module.exports = router