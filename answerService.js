const Answer = require('./answer')

// Create REST API, adds CRUD to Mongog's Schema
Answer.methods(['get', 'post', 'put', 'delete'])

// Return post/put methods updated
Answer.updateOptions({new: true, runValidators: true})

module.exports = Answer