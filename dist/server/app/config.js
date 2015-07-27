// import live from 'connect-livereload';

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (app, express) {

	app.set('port', 2000);

	app.use(express['static'](__dirname + '/../../client'));
};

module.exports = exports['default'];