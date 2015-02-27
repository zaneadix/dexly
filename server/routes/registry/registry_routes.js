"use strict";

var controller = require('./registry_controllers.js');

module.exports = exports = function (router) {

  router.route('/registry')

    .get(controller.get)
};
