'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _middleMiddle = require('./middle/middle');

var _middleMiddle2 = _interopRequireDefault(_middleMiddle);

var _pokeapiPokeapi = require('./pokeapi/pokeapi');

var _pokeapiPokeapi2 = _interopRequireDefault(_pokeapiPokeapi);

// Launch server
_middleMiddle2['default'].listen(_middleMiddle2['default'].get('port'));
console.info('Check out ' + _middleMiddle2['default'].get('base url') + ':' + _middleMiddle2['default'].get('port'));

(0, _pokeapiPokeapi2['default'])();