'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _descriptionModel = require('./description-model');

var _descriptionModel2 = _interopRequireDefault(_descriptionModel);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var description = _q2['default'].nbind(_descriptionModel2['default'].find, _descriptionModel2['default']);

exports['default'] = {

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
module.exports = exports['default'];