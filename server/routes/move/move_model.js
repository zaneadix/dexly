'use strict'

var mongoose = require('mongoose');

var MoveSchema = new mongoose.Schema({

  accuracy: Number,

  category: String,

  description: String,

  id: Number,

  modified: String,

  name: String,

  power: Number,

  pp: Number
})

var Move = mongoose.model('Move', MoveSchema)

Move.message = ' is a move used by Pokemon'

module.exports = exports = Move
