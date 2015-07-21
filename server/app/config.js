"use strict";

var mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    middle      = require('./middleware');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/dex', function(error, db) {
  if (!error) {
    console.log('Connected to database')
  } else {
    console.log('Failed to connect to database')
  }
});


/***********************************************
 * Include all your global env variables here. *
 ***********************************************/

module.exports = exports = function (app, express, routers) {

  app.set('port', process.env.PORT || 5000);
  app.set('base url', process.env.URL || 'http://localhost');

  app.use(morgan('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(middle.cors);

  // for angular project
  // app.use(express.static(__dirname + '/../../client/angular'));

  // for ampersand project
  app.use(express.static(__dirname + '/../../client/ampersand'));

  //for all clients
  app.use(express.static(__dirname + '/../../client'));

  app.use('/', routers.RegistryRouter);
  app.use('/', routers.PokemonRouter);
  app.use('/', routers.DescriptionRouter);
  app.use('/', routers.AbilityRouter);
  app.use('/', routers.EggGroupRouter);
  app.use('/', routers.MoveRouter);
  app.use('/', routers.TypeRouter);

  app.use(middle.logError);
  app.use(middle.handleError);
};
