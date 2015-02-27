
'use strict';

angular.module('dex.main.registry')

  .directive('entry', function() {

    function link(scope, element) {

      element.on('click', function() {
        console.log(element);
      });
    }

    return {
      restrict: 'EA',
      templateUrl: 'components/registry/entry.directive.html',
      link: link,
      scope: {
        info: '=',
        types: '&'
      }
    };
  });
