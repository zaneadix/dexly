'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var DescriptionSchema = new _mongoose2['default'].Schema({

    description: String,

    games: [{

        name: String
    }],

    id: Number,

    modified: String,

    name: String,

    pokemon: {

        name: String,

        national_id: Number
    }
});

var Description = _mongoose2['default'].model('Description', DescriptionSchema);

Description.message = ' description obtained';

exports['default'] = Description;
module.exports = exports['default'];