'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

_mongoose2['default'].connect(process.env.DB_URL || 'mongodb://localhost/dex', function (error, db) {

	if (!error) {
		console.log('Connected to database');
	} else {
		console.log('Failed to connect to database');
	}
});

exports['default'] = function (app, express, routers) {

	app.set('port', process.env.PORT || 2000);
	app.set('base url', process.env.URL || 'http://localhost');

	app.use((0, _morgan2['default'])('dev'));

	app.use(_bodyParser2['default'].json());
	app.use(_bodyParser2['default'].urlencoded({ extended: true }));

	//for all clients
	app.use(express['static'](__dirname + '/../../client'));

	app.use('/', routers.RegistryRouter);
	app.use('/', routers.PokemonRouter);
	app.use('/', routers.DescriptionRouter);
	app.use('/', routers.AbilityRouter);
	app.use('/', routers.EggGroupRouter);
	app.use('/', routers.MoveRouter);
	app.use('/', routers.TypeRouter);
};

;
module.exports = exports['default'];