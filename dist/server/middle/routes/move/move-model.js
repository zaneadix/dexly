'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var MoveSchema = new _mongoose2['default'].Schema({

	accuracy: Number,

	category: String,

	description: String,

	id: Number,

	modified: String,

	name: String,

	power: Number,

	pp: Number
});

var Move = _mongoose2['default'].model('Move', MoveSchema);

Move.message = ' is a move used by Pokemon';

exports['default'] = Move;
module.exports = exports['default'];