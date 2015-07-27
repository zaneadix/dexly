'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var AbilitySchema = new _mongoose2['default'].Schema({

	description: String,

	id: Number,

	modified: String,

	name: String

}, { versionKey: false });

var Ability = _mongoose2['default'].model('Ability', AbilitySchema);

Ability.message = ' is an ability that some Pokemon have';

exports['default'] = Ability;
module.exports = exports['default'];