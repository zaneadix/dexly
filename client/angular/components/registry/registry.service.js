
'use strict';

angular.module('dex.main.registry')

.factory('registryService', ['$q', 'Restangular', function($q, restangular) {

    var registry = restangular.one('registry');

    var generations = {

      gen1:  {
                generation: 1,
                count:      151,
                offset:     0
              },
      gen2:  {
                generation: 2,
                count:      100,
                offset:     151,
              },
      gen3:  {
                generation: 3,
                count:      135,
                offset:     251,
              },
      gen4:  {
                generation: 4,
                count:      107,
                offset:     386,
              },
      gen5:  {
                generation: 5,
                count:      156,
                offset:     493,
              },
      gen6:  {
                generation: 6,
                count:      70,
                offset:     649,
              }
    };

    var getNationalRegistry = function () {

      var reg = $q.defer();

      registry.get().then(function(data) {
        reg.resolve(data);
      });

      return reg.promise;
    };

    // Service Object
    return {

      getNationalRegistry: getNationalRegistry,
      generations: generations
    };

  }]);
