const { Router } = require('express')
const router = Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extends : false})

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
})

router.post('/sendMessage', urlencodedParser, (req, res) => {
  const sender = req.body.sender
})

module.exports = router