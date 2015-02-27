'use strict';

var View = require('ampersand-view');
var SummaryTemplate = require('../templates/pokemon-summary-template.jade');
var Filters = require('../common/filters');

module.exports = View.extend({

  template: SummaryTemplate,

  events: {

    'click' : 'triggerRoute'
  },

  bindings: {

    'model.nationalId' : [
      {
        type: function(el, value) {
          el.innerHTML = Filters.digitFilter(value, 3);
        },
        hook: 'nationalId'
      },
      {
        type: function(el, value) {
          el.setAttribute('src', 'images/' + value + '.png');
        },
        hook: 'image'
      }
    ],

    'model.name' : {

      type: 'text',
      hook: 'name'
    }
  },

  triggerRoute: function (event, element) {

    // this.id = this.name || this.queryByHook('name').textContent;

    window.app.router.navigate('/pokemon/' + this.model.nationalId, {trigger: true});
  }

});
