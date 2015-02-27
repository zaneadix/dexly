'use strict';

var restler = require('restler');

module.exports = exports = {

  pokedex: function() {
    return restler.get('http://pokeapi.co/api/v1/pokedex/1/')
      .on('complete', function(pokedex) {
        return pokedex;
      });
  }

}
