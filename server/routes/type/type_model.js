'use strict'

var mongoose = require('mongoose');

var TypeSchema = new mongoose.Schema({

  id: Number,

  ineffective: [{
    name: String,
    resource_uri: String
  }],

  modified: String,

  name: String,

  no_effect: [{

    name: String
  }],

  resistance: [{

    name: String
  }],

  super_effective: [{

    name: String
  }],

  weakness: [{

    name: String
  }]

})

var Type = mongoose.model('Type', TypeSchema)

Type.message = ' type is a type of Pokemon'

module.exports = exports = Type
