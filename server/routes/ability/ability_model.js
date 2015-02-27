'use strict'

var mongoose = require('mongoose');

var AbilitySchema = new mongoose.Schema({

  description: String,

  id: Number,

  modified: String,

  name: String,

}, { versionKey: false })

var Ability = mongoose.model('Ability', AbilitySchema)

Ability.message = ' is an ability that some Pokemon have'

module.exports = exports = Ability
