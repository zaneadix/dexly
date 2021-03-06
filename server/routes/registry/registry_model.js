'use strict'

var mongoose = require('mongoose');

var RegistrySchema = new mongoose.Schema({

  name: String,

  pokemon: [{

    name: String,

    national_id: Number,

    types: [{

      name: String

    }]

  }]
});

var Registry = mongoose.model('Registry', RegistrySchema);

Registry.message = ' registry created';

module.exports = exports = Registry;
