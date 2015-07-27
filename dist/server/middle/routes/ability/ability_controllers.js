'use strict';

var Ability = require('./ability_model.js'),
    Q = require('q');

var ability = Q.nbind(Ability.findOne, Ability);

module.exports = exports = {

  get: function get(req, res, next) {

    var query = {};

    isNaN(req.params.id) ? query['name'] = req.params.id : query['id'] = req.params.id;

    ability(query, { _id: false }).then(function (mon) {

      res.json(mon);
    }).fail(function (reason) {

      next(reason);
    });
  }
};