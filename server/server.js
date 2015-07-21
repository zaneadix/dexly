'use strict';

var dex     = require('./app/dex.js'),
    port    = dex.get('port'),
    pokeapi = require('./pokeapi.js'),
    log     = 'Listening on ' + dex.get('base url') + ':' + port;

dex.listen(port);
console.log(log);

pokeapi.update();
