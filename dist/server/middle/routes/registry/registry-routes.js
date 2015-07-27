'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _registryController = require('./registry-controller');

var _registryController2 = _interopRequireDefault(_registryController);

module.exports = exports = function (router) {

	router.route('/registry').get(_registryController2['default'].get);
};