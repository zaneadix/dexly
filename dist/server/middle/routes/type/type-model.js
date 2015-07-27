'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var TypeSchema = new _mongoose2['default'].Schema({

    id: Number,

    ineffective: [{

        name: String,
        resource_uri: String
    }],

    modified: String,

    name: String,

    no_effect: [{

        name: String
    }],

    resistance: [{

        name: String
    }],

    super_effective: [{

        name: String
    }],

    weakness: [{

        name: String
    }]

});

var Type = _mongoose2['default'].model('Type', TypeSchema);

Type.message = ' type is a type of Pokemon';

exports['default'] = Type;
module.exports = exports['default'];