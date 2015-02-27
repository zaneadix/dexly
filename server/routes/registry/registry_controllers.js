"use strict";

var Registry  = require('./registry_model.js'),
    Q         = require('q');

var registry = Q.nbind(Registry.findOne, Registry);

module.exports = exports = {

  get: function (req, res, next) {

    registry({ 'name' : 'national' })

      .then(function (reg) {

        res.json(reg);
      })

      .fail(function (reason) {

        next(reason);
      });
  }
};
