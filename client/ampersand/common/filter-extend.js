'use strict';

module.exports = function (original) {

  console.log(original);

  var filtered = new original.constructor();

  filtered._callbacks = {};

  filtered.filter = function (filters) {

    var result = original.filter(function(mon) {

      return mon.name.toLowerCase().match('^'+filter.name.toLowerCase()) != null;
    })

    filtered._filters = filters;

    filtered.reset(result);
  }

  original.on("reset", function(){
      console.log(original);
  });

  return filtered;
}
