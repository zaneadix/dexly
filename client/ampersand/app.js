'use strict';

var Router = require('./router');
var $ = require('jquery');

window.app = {

  init : function () {

    this.hero = $('#hero');
    this.content = $('#content');

    this.router = new Router();
    this.router.history.start();
  },

  toggleScroll : function () {

    $('body').toggleClass('noscroll');
  }
};

window.app.init();
