'use strict';

var restler     = require('restler'),
    _           = require('lodash'),
    async       = require('async'),
    mongoose    = require('mongoose');

var pokeapi       = 'http://pokeapi.co/',
    v1            = 'api/v1/',
    params        = '?limit=10';


/************************
*  Database and Models  *
************************/

var Ability     = require('./routes/ability/ability_model'),
    Description = require('./routes/description/description_model'),
    EggGroup    = require('./routes/egg_group/egg_group_model'),
    Move        = require('./routes/move/move_model'),
    Pokemon     = require('./routes/pokemon/pokemon_model'),
    Registry    = require('./routes/registry/registry_model'),
    Type        = require('./routes/type/type_model');


/*********************************
*  Initialize National Registry  *
*********************************/

var nationalRegistry;

Registry.findOne( {name: 'national'}, function(error, doc) {

  if (doc) {

    nationalRegistry = doc;
    return;
  }

  Registry.create( { name: 'national', pokemon: [] }, function(error, doc) {

    nationalRegistry = doc;
  })
})


/************
*  Updates  *
************/

function update() {

  async.series([

    function(next) {

      updateDocs(pokeapi + v1 + 'type/' + params, 'name', Type, next);
    },

    function(next) {

      updateDocs(pokeapi + v1 + 'move/' + params, 'id', Move, next);
    },

    function(next) {

      updateDocs(pokeapi + v1 + 'ability/' + params, 'id', Ability, next);
    },

    function(next) {

      updateDocs(pokeapi + v1 + 'egg/' + params, 'id', EggGroup, next);
    },

    function(next) {

      updateDocs(pokeapi + v1 + 'description/'+ params, 'id', Description, next);
    },

    function(next) {

      updateDocs(pokeapi + v1 + 'pokemon/' + params, 'name', Pokemon);
    }
  ]);
}



function updateDocs (url, comparitor, model, callback) {

  restler.get(url).on('complete', function(docs) {

    _.forEach(docs.objects, function(pulledDoc) {

      var search = {}
      search[comparitor] = pulledDoc[comparitor]

      // console.log(model.modelName);

      model.findOne(search, function(error, storedDoc) {

        if (error) { console.log(error); return; }

        if (storedDoc) {

          beenModified(pulledDoc, storedDoc) && updateADoc(pulledDoc, storedDoc)

          return
        }

        massage(pulledDoc);

        createModel(model, pulledDoc);

        console.log(pulledDoc.name + ' ' + model.message);
      })
    })

    if (docs.meta && docs.meta.next) {

      updateDocs(pokeapi + docs.meta.next, comparitor, model, callback);

    } else {

      if (callback) { callback(); }
    }

  })
}


function createModel (model, pulled) {

  if (model.modelName == 'Pokemon') {

    createPokemonModel (pulled);

  } else {

    console.log('create other model');

    model.create(pulled, function(error, doc) {

      if (error) { console.log(error); return; }
    })
  }
}


function createPokemonModel (pulled) {

  var sets = {

    abilities : buildWorkingSet(pulled.abilities),
    moves : buildWorkingSet(pulled.moves),
    eggGroups : buildWorkingSet(pulled.egg_groups),
    types : buildWorkingSet(pulled.types)
  }

  pulled.abilities = [];
  pulled.moves = [];
  pulled.egg_groups = [];
  pulled.types = [];

  Pokemon.create(pulled, function(error, doc) {

    if (error) { console.log(error); return; }

    setObjectIds(doc, Type, sets.types, 'types');
    setObjectIds(doc, Ability, sets.abilities, 'abilities');
    setObjectIds(doc, Move, sets.moves, 'moves');
    setObjectIds(doc, EggGroup, sets.eggGroups, 'egg_groups');

    registerMon(doc);

  });
}


function buildWorkingSet (set) {

  var set = _.map(set, function(one) {

    return one.name.charAt(0).toUpperCase() + one.name.slice(1);
  });

  // console.log(set);
  return set;
}


function setObjectIds (doc, model, set, key, callBack) {

  model.find({ 'name': { $in: set }}, function(err, docs) {

    if (err) { console.log(err); return; }

    doc[key] = _.map(docs, function(one) { return one._id; });
    doc.save();

    callBack && callBack();

  });
}


function beenModified (pulled, stored) {

  if (stored.modified !== pulled.modified) {
    console.log('Found change to ' + stored.name)
    return true
  }

  console.log('No change to ' + stored.name);
  return false
}


function updateADoc (pulled, stored) {

  massage(pulled);

  _.forEach(_.keys(stored), function(key) {

    stored[key] = pulled[key];
  })

  stored.save();
}


function massage (doc) {

  if (doc && doc.pokemon) {

    _.isArray(doc.pokemon) ? setNationalIds(doc.pokemon) : setNationalIds([doc.pokemon])
  }

}


function setNationalIds (pokemon) {

  _.forEach(pokemon, function(mon) {

    var id = parseInt(mon.resource_uri.match(/([0-9]+)/g)[1]);
    mon.national_id = id;
  })
}


/*********************
*  Massage Registry  *
*********************/

function registerMon (mon) {

  var poke = {

    name: mon.name,
    national_id: mon.national_id,
    types: mon.types
  }

  nationalRegistry.pokemon.push(poke)
  nationalRegistry.save()
  console.log(poke.name + ' regesitered');
}

function compareMon (poke, mon) {

  poke = poke.national_id;
  mon = mon.national_id;

  return (poke < mon) ? -1 : (poke > mon) ? 1 : 0;
}


/************
*  Exports  *
************/

module.exports = exports = {

  update: update
}
