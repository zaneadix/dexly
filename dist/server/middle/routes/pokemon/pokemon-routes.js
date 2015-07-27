'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _pokemonController = require('./pokemon-controller');

var _pokemonController2 = _interopRequireDefault(_pokemonController);

module.exports = exports = function (router) {

  router.route('/pokemon/:id').get(_pokemonController2['default'].get);
};
// router.route('/pokemon-detail/:id')
//   .get(controller.getDetail)