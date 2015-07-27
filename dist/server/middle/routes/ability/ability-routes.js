'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _abilityController = require('./ability-controller');

var _abilityController2 = _interopRequireDefault(_abilityController);

module.exports = exports = function (router) {

	router.route('/ability/:id').get(_abilityController2['default'].get);
};