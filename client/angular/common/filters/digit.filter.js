
'use strict';

angular.module('dex')

  .filter('digit', function() {

    return function (input, places) {

      places = places || 0;

      var zeros = '';

      for (var i = 0; i < places; i++) {

        zeros += '0';
      }

      zeros += input;

      return zeros.substr(-places);
    };
  });
