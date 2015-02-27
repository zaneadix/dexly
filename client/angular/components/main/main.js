
(function (angular) {

  'use strict';

  angular.module('dex.main', [
      'ui.router',
      'dex.main.registry'
    ])

    .config(function ($stateProvider) {
      $stateProvider
        .state('dex.main', {
          url: '/main',
          abstract: true,
          templateUrl: 'components/main/main.view.html'
        });
    });

}(angular));
