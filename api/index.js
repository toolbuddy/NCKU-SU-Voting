const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const voting = require('./routes/voting')
const getContent = require('./routes/getContent')

// config root path
const path = require('path')
global.rootPath = path.join(__dirname + '/../')

// Import API Routes
app.use(voting)
app.use(getContent)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
