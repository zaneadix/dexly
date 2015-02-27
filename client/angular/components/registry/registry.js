
'use strict';

angular.module('dex.main.registry', ['ui.router', 'restangular'])

  /*********
  * CONFIG *
  *********/

  .config(function ($stateProvider) {

    $stateProvider
      .state('dex.main.registry', {
        url: '/registry',
        templateUrl: 'components/registry/registry.view.html',
        controller: 'RegistryController'
      });
  })

  /*************
  * CONTROLLER *
  *************/

  .controller('RegistryController', ['$scope', 'registryService', function($scope, registryService) {

    $scope.generations = registryService.generations;

    $scope.getTypes = function (pokemon) {

      var types = '';

      pokemon.types.forEach(function (type) {
        types += type.name + ' ';
      });

      return types;
    };

    registryService.getNationalRegistry().then(function (registry) {

      registry.pokemon.sort(compareMon);

      console.log(registry.pokemon);

        $scope.entries = registry.pokemon.slice(
          $scope.generations.gen1.offset,
          718
        );
    });

    function compareMon (poke, mon) {

      poke = poke.national_id;
      mon = mon.national_id;

      return (poke < mon) ? -1 : (poke > mon) ? 1 : 0;
    }

  }]);

