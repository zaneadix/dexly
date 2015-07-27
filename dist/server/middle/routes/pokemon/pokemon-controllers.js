'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _abilityModel = require('./ability-model');

var _abilityModel2 = _interopRequireDefault(_abilityModel);

var _typeModel = require('./type-model');

var _typeModel2 = _interopRequireDefault(_typeModel);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var pokemon = _q2['default'].nbind(_abilityModel2['default'].findAndPopulate, _abilityModel2['default']),
    type = _q2['default'].nbind(_typeModel2['default'].findOne, _typeModel2['default']);

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