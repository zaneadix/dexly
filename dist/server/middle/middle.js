'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routesRegistryRegistryRoutes = require('./routes/registry/registry-routes');

var _routesRegistryRegistryRoutes2 = _interopRequireDefault(_routesRegistryRegistryRoutes);

var _routesPokemonPokemonRoutes = require('./routes/pokemon/pokemon-routes');

var _routesPokemonPokemonRoutes2 = _interopRequireDefault(_routesPokemonPokemonRoutes);

var _routesDescriptionDescriptionRoutes = require('./routes/description/description-routes');

var _routesDescriptionDescriptionRoutes2 = _interopRequireDefault(_routesDescriptionDescriptionRoutes);

var _routesAbilityAbilityRoutes = require('./routes/ability/ability-routes');

var _routesAbilityAbilityRoutes2 = _interopRequireDefault(_routesAbilityAbilityRoutes);

var routers = {},
    server = (0, _express2['default'])();

var RegistryRouter = _express2['default'].Router();
routers.RegistryRouter = RegistryRouter;

var PokemonRouter = _express2['default'].Router();
routers.PokemonRouter = PokemonRouter;

var DescriptionRouter = _express2['default'].Router();
routers.DescriptionRouter = DescriptionRouter;

var AbilityRouter = _express2['default'].Router();
routers.AbilityRouter = AbilityRouter;

var EggGroupRouter = _express2['default'].Router();
routers.EggGroupRouter = EggGroupRouter;

var MoveRouter = _express2['default'].Router();
routers.MoveRouter = MoveRouter;

var TypeRouter = _express2['default'].Router();
routers.TypeRouter = TypeRouter;

(0, _config2['default'])(server, _express2['default'], routers);

(0, _routesRegistryRegistryRoutes2['default'])(RegistryRouter);
(0, _routesPokemonPokemonRoutes2['default'])(PokemonRouter);
(0, _routesDescriptionDescriptionRoutes2['default'])(DescriptionRouter);
(0, _routesAbilityAbilityRoutes2['default'])(AbilityRouter);

exports['default'] = server;
module.exports = exports['default'];