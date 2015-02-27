'use strict';

var Router    = require('ampersand-router');
var HeaderView  = require('./views/header-view');
var RegistryView  = require('./views/registry-view');
var DetailModel   = require('./models/pokemon-detail-model');

module.exports = Router.extend({

  routes: {

    '' : 'renderRegistryView',

    'pokemon/:id' : 'renderPokemonView'
  },


  initialize: function() {

    this.headerView = new HeaderView({

      el: document.getElementById('header')
    });
  },


  renderRegistryView: function() {

    this.clearContent();

    if (!this.registryView) {

      console.log("CREATE REGISTRY")

      this.registryView = new RegistryView ({

        el : app.content[0]

      });

      this.listenTo(this.headerView, 'filterByName', function () {

        this.registryView.constrain(this.headerView.getNameFilter());

      });

    } else {

      console.log("REFERENCE REGISTRY")

      this.registryView.render();
    }

  },

  renderPokemonView: function(nationalId) {

    this.clearContent();

    var detail = new DetailModel({ id : nationalId });

    detail.fetch();

    this.listenTo(detail, 'sync', function() {

      app.content.html('<h1>' + detail.name + '</h1>');
    })

  },

  clearContent: function() {

    app.content.html('');
  }

});
