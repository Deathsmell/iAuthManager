const moment = require('moment')

module.exports.dateFormatting = (date) => moment(date).format("hh:mm:ss MM-DD-YY")


