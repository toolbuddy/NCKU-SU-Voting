const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const vote = require('./routes/vote')
const content = require('./routes/content')
const sendMessage = require('./routes/sendMessage')

// config root path
const path = require('path')
global.rootPath = path.join(__dirname + '/../')

// Import API Routes
app.use(vote)
app.use(content)
app.use(sendMessage)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
