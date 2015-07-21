'use strict';

var View = require('ampersand-view');
var Events = require ('ampersand-events');
var Extend = require ('amp-extend');
var Header = require('../templates/header-template.jade');
var $ = require('jquery');


module.exports = View.extend({

  template: Header,

  initialize: function() {

    this.render();

    this.menu = $(this.queryByHook('menu'));

    this.statement = $(this.queryByHook('statement'));

    this.menuToggle = $(this.query('.icon'));

    this.nameFilter = this.query('input');

    this.initializeMenu();
  },

  initializeMenu: function() {

    var header = this;
    var menuState = 'open';
    var closedHeight = this.menu.height();
    var statementHeight = this.statement.height();
    var $window = $(window);
    var speed = 600;

    this.menu.css('height', $window.height());
    app.hero.css('marginTop', $window.height());
    window.app.toggleScroll();

    this.menuToggle.on('click', function() {

      $(this).toggleClass('open');

      menuState === 'open' ? menuState = 'closed' : menuState = 'open';

      if (menuState === 'open') {

        var setting = $(window).height();

        header.menu.animate({'height': $window.height()}, speed);
        header.statement.animate({'bottom': '0', 'padding': '1.2em', 'opacity': '1'}, speed);
        app.hero.animate({'margin-top': $window.height()}, speed);

      } else {

        header.menu.animate({'height': closedHeight}, speed);
        header.statement.animate({'bottom': '-140px', 'padding': '0', 'opacity': '0'}, speed);
        app.hero.animate({'margin-top': closedHeight}, speed);
      }

      app.toggleScroll();
    });
  },

  events: {

    'keyup [data-hook~=nameFilter]' : 'triggerFilterByName'
  },

  render: function() {

    this.el.innerHTML = this.template();
  },

  triggerFilterByName: function(e) { this.trigger('filterByName'); },

  getNameFilter: function() { return this.nameFilter.value; }

});
