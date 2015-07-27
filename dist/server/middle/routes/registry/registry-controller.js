'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _registryModel = require('./registry-model');

var _registryModel2 = _interopRequireDefault(_registryModel);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var registry = _q2['default'].nbind(_registryModel2['default'].findOne, _registryModel2['default']);

exports['default'] = {

    get: function get(req, res, next) {

        registry({ 'name': 'national' }).then(function (reg) {

            res.json(reg);
        }).fail(function (reason) {

            next(reason);
        });
    }
};
module.exports = exports['default'];