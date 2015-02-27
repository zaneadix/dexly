'use strict';

var View                = require('ampersand-view');
var PokemonSummaryView  = require('./pokemon-summary-view');
var Registry            = require('../models/registry-collection');

module.exports = View.extend({

  initialize: function () {

    this.constraints = { name: '' };
    this.constrainer = this.getConstrainer();
    this.collection = new Registry();
    this.collection.fetch();
    this.listenTo(this.collection, 'sort', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },

  render: function (options) {

    console.log("REGISTRY RENDER")

    this.el.innerHTML = '';

    this.renderCollection(this.collection,
      PokemonSummaryView,
      this.el,
      {filter: this.constrainer});

    return this;
  },

  addOne: function (mon) {

    var summaryView = new PokemonSummaryView({ model: mon });

    summaryView.render();
  },

  constrain: function (constraint) {

    this.constraints.name = constraint;
    this.render();
  },

  getConstrainer: function () {

    var view = this;

    return function(model) {

      return model.name.toLowerCase().match('^'+view.constraints.name.toLowerCase()) != null;
    }
  }

});
