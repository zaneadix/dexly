
'use strict';

angular.module('dex')

  .filter('startsWith', function() {

    return function (input, comp) {

      if (!input) {
        return;
      }

      if (!comp || !comp.name) {
        return input;
      }

      comp = comp.name.toLowerCase();

      var result = [];

      input.forEach( function(mon) {

        var monName = mon.name.toLowerCase();

        console.log(monName.substring(0, comp.length));

        if (monName.substring(0, comp.length) === comp) {
          result.push(mon);
        }
      });

      return result;
    };
  });
