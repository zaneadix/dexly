'use strict';

var controller = require('./description_controllers.js');

module.exports = exports = function (router) {

  router.route('/description/:id').get(controller.get);
};