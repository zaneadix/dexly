
'use strict';

var Model = require('ampersand-model');

module.exports = Model.extend({

  urlRoot: '/pokemon',

  props: {

    name:       'string',
    nationalId: 'number',
    height:     'string',
    weight:     'string',
    hp:         'number',

    attack:         'number',
    defense:        'number',
    specialAttack:  'number',
    specialDefense: 'number',
    speed:          'number',

    types:      'array',
    moves:      'array',
    evolutions: 'array',
    abilities:  'array'
  },

  initialize: function (options) {

    this.id = options.id

    this.on('sync', function() {

      console.log('synced');
    })
  },

  parse: function (mon) {

    mon.nationalId = mon.national_id;
    delete mon.national_id;

    mon.specialAttack = mon.sp_atk;
    delete mon.sp_atk;

    mon.specialDefense = mon.sp_def;
    delete mon.sp_def;

    mon.evolutions = mon.evolutions.map(function(evolution) {
      return { method: evolution.method, name: evolution.to };
    });

    return mon;
  }
});
