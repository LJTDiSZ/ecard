var mongoose = require('mongoose')
var CardSchema = require('../schemas/card')
var Card = mongoose.model('card', CardSchema)

module.exports = Card

