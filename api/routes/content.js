const { Router } = require('express')
const router = Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extends: false })

const voteData = require('../../model/voteData.json')
const detailData = require('../../model/detailData.json')

router.get('/getAllVoteTitle', urlencodedParser, (req, res) => {
  res.status(200)
  res.json(Object.keys(voteData).map(target => {
    return voteData[target].title
  }))
})

router.get('/getVoteContent', urlencodedParser, (req, res) => {
  const id = parseInt(req.query.id)
  if (id < 1 || id > 6) {
    res.status(404)
    res.end()
  }
  res.status(200)
  res.json(voteData[`proposal_${id}`])
})

router.get('/getDetailContent', urlencodedParser, (req, res) => {
  const id = parseInt(req.query.id)
  if (id !== 1) {
    res.status(404)
    res.end()
  }
  res.json(detailData)
})

router.post('/getArticles', urlencodedParser, (req, res) => {
  const offset = parseInt(req.body.offset)
  const limit = parseInt(req.body.limit)
  if (offset < 0 || limit < 1) {
    res.status(404)
    res.end()
  }
  
  res.status(200)
  res.json(detailData)
})

module.exports = router