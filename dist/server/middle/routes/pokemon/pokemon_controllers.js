'use strict';

var Pokemon = require('./pokemon_model.js'),
    Type = require('../type/type_model.js'),
    Q = require('q');

var pokemon = Q.nbind(Pokemon.findAndPopulate, Pokemon);
var type = Q.nbind(Type.findOne, Type);

function getId(id) {

  var query = {};

  isNaN(id) ? query['name'] = id : query['national_id'] = id;

  console.log(query);

  return query;
};

module.exports = exports = {

  get: function get(req, res, next) {

    pokemon(getId(req.params.id), res);
  }
};
// .then(function (mon) {

//   console.log('peen');
//   res.json(mon)
// })

// .fail(function (reason) {

//   next(reason)
// })