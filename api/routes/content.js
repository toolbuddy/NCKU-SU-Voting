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

router.get('/getAnnouncements', urlencodedParser, (req, res) => {
  res.status(200)
  res.send(JSON.stringify(detailData))
  res.end()
})

router.get('/getAnnouncementById', urlencodedParser, (req, res) => {
  const id = parseInt(req.query.id) - 1
  if (id < 0) {
    res.status(500)
    res.end()
    return
  }
  const data = Object.values(detailData).slice(Math.min(Object.keys(detailData).length - 1, id), Math.min(Object.keys(detailData).length - 1, id) + 1)
  res.status(200)
  res.send(JSON.stringify(data[0]))
  res.end()
})


router.get('/getAnnouncementsCurrent', urlencodedParser, (req, res) => {
  // sort the detail by time
  let sortedData = Object.keys(detailData).map(target => {
    const iter = detailData[target]
    iter.id = target
    return iter
  })
  sortedData = sortedData.sort((a, b) => {
    const a_time = new Date(a.time)
    const b_time = new Date(b.time)
    return (a_time - b_time) < 0
  })
  sortedData.slice(0, Math.min(Object.keys(detailData).length, 5))
  res.status(200)
  res.send(JSON.stringify(sortedData))
  res.end()
})

router.get('/getAnnouncementsNumber', urlencodedParser, (req, res) => {
  res.status(200)
  res.send(Object.keys(detailData).length.toString())
  res.end()
})

module.exports = router
