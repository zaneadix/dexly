'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var EggGroupSchema = new _mongoose2['default'].Schema({

  id: Number,

  modified: String,

  name: String,

  pokemon: [{

    name: String,

    national_id: Number
  }]
});

var EggGroup = _mongoose2['default'].model('EggGroup', EggGroupSchema);

EggGroup.message = ' is a type of egg that makes Pokemon';

exports['default'] = EggGroup;
module.exports = exports['default'];