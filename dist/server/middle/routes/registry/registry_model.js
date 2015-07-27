'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var RegistrySchema = new _mongoose2['default'].Schema({

  name: String,

  pokemon: [{

    name: String,

    national_id: Number,

    types: [{

      name: String

    }]

  }]
});

var Registry = _mongoose2['default'].model('Registry', RegistrySchema);

Registry.message = ' registry created';

exports['default'] = Registry;
module.exports = exports['default'];