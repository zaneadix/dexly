'use strict';

var Description = require('./description_model.js'),
    Q = require('q');

var description = Q.nbind(Description.find, Description);

module.exports = exports = {

  get: function get(req, res, next) {

    var mon = {};

    isNaN(req.params.id) ? mon['pokemon.name'] = req.params.id : mon['pokemon.national_id'] = req.params.id;

    description(mon).then(function (mon) {

      res.json(mon);
    }).fail(function (reason) {

      next(reason);
    });
  }
};