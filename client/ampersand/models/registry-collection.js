'use strict';

var RestCollection = require('ampersand-rest-collection');
var PokemonSummary = require('./pokemon-summary-model');

module.exports = RestCollection.extend({

  url: '/registry',

  model: PokemonSummary,

  comparator: 'nationalId',

  initialize: function() {

    this.on('sort', function() {

      this.models = this.models.slice(0,300);
    })
  },

  parse: function (reg) {

    this.name = reg.name;
    return reg.pokemon;
  }
});
