'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _pokemonModel = require('./pokemon-model');

var _pokemonModel2 = _interopRequireDefault(_pokemonModel);

var _typeTypeModel = require('./../type/type-model');

var _typeTypeModel2 = _interopRequireDefault(_typeTypeModel);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var pokemon = _q2['default'].nbind(_pokemonModel2['default'].findAndPopulate, _pokemonModel2['default']),
    type = _q2['default'].nbind(_typeTypeModel2['default'].findOne, _typeTypeModel2['default']);

function getId(id) {

    var query = {};

    isNaN(id) ? query['name'] = id : query['national_id'] = id;

    console.log(query);

    return query;
};

exports['default'] = {

    get: function get(req, res, next) {

        pokemon(getId(req.params.id), res);
    }
};
module.exports = exports['default'];
// .then(function (mon) {

//   console.log('peen');
//   res.json(mon)
// })

// .fail(function (reason) {

//   next(reason)
// })