"use strict";

var express = require('express'),
    dex     = express(),
    restler = require('restler');

var routers = {}

var RegistryRouter = express.Router()
routers.RegistryRouter = RegistryRouter

var PokemonRouter = express.Router()
routers.PokemonRouter = PokemonRouter

var DescriptionRouter = express.Router()
routers.DescriptionRouter = DescriptionRouter

var AbilityRouter = express.Router()
routers.AbilityRouter = AbilityRouter

var EggGroupRouter = express.Router()
routers.EggGroupRouter = EggGroupRouter

var MoveRouter = express.Router()
routers.MoveRouter = MoveRouter

var TypeRouter = express.Router()
routers.TypeRouter = TypeRouter

require('./config.js')(dex, express, routers)

require('../routes/registry/registry_routes.js')(RegistryRouter)
require('../routes/pokemon/pokemon_routes.js')(PokemonRouter)
require('../routes/description/description_routes.js')(DescriptionRouter)
require('../routes/ability/ability_routes.js')(AbilityRouter)

module.exports = exports = dex
