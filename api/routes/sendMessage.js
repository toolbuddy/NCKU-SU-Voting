const { Router } = require('express')
const router = Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extends : false})

// TODO: Configure DomainKeys Identified Mail in your DNS and code.
const sendmail = require('sendmail')({
  smtpHost: '140.116.219.159',
  smtpPort: 25,
  dkim: {
    privateKey: fs.readFileSync('./dkim-private.pem', 'utf8'),
    keySelector: 'mydomainkey'
  },
})

router.post('/sendMessage', urlencodedParser, (req, res) => {
  const sender = req.body.sender
  const receiver = 'nckusu@mail.ncku.edu.tw'
  const subject = req.body.subject
  const content = req.body.content
  console.log(req.body)
  sendmail({
    from: sender,
    to: receiver,
    subject: subject,
    text: content
  }, (err, reply) => {
    console.log(err)
    console.dir(reply)
  })
})

module.exports = router