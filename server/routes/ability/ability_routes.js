"use strict";

var controller = require('./ability_controllers.js');

module.exports = exports = function (router) {

  router.route('/ability/:id')
    .get(controller.get)
};
