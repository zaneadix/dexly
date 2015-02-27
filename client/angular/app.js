
(function (angular) {

  'use strict';

  angular.module('dex', [
    'ngFx',
    //'ngTouch',
    //'ngCookies',
    'ui.router',
    'restangular',
    'dex.main'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/dex/main/registry');

    $stateProvider
      .state('dex', {
        url: '/dex',
        abstract: true,
        template: '<ui-view></ui-view>'
      });
  });

}(angular));



