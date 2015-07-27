'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _descriptionController = require('./description-controller');

var _descriptionController2 = _interopRequireDefault(_descriptionController);

module.exports = exports = function (router) {

	router.route('/description/:id').get(_descriptionController2['default'].get);
};