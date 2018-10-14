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
  if (offset < 0) {
    res.status(404)
    res.end()
    return
  }
  // sort the detail by time
  let sortedData = Object.values(detailData).filter(target => {
    const time = new Date(target.time)
    const currentTime = new Date()
    return currentTime - time
  })
  sortedData = sortedData.sort((a, b) => {
    const a_time = new Date(a.time)
    const b_time = new Date(b.time)
    return (a_time - b_time) < 0
  })
  const data = []
  for(let i = offset ; i < offset + limit ; ++i) {
    if (sortedData[i]) {
      data.push(sortedData[i])
    }
  }
  res.status(200)
  res.send(JSON.stringify(data))
  res.end()
})

module.exports = router
