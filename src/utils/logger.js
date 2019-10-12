const bunyan = require('bunyan')

module.exports.logger = bunyan.createLogger({ name: 'content-service' })
