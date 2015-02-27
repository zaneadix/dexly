
'use strict';

var State = require('ampersand-state');

module.exports = State.extend({

  props: {

    name: 'string',

    nationalId: 'number',

    types: 'array'
  },

  parse: function (mon) {

    mon.nationalId = mon.national_id;
    delete mon.national_id;

    mon.types = mon.types.map(function(type) {
      return type.name;
    });

    return mon;
  }
});
