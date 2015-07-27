'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _abilityModel = require('./ability-model');

var _abilityModel2 = _interopRequireDefault(_abilityModel);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var ability = _q2['default'].nbind(_abilityModel2['default'].findOne, _abilityModel2['default']);

exports['default'] = {

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
module.exports = exports['default'];