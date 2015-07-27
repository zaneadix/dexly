'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _restler = require('restler');

var _restler2 = _interopRequireDefault(_restler);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _middleRoutesAbilityAbilityModel = require('./../middle/routes/ability/ability-model');

var _middleRoutesAbilityAbilityModel2 = _interopRequireDefault(_middleRoutesAbilityAbilityModel);

var _middleRoutesDescriptionDescriptionModel = require('./../middle/routes/description/description-model');

var _middleRoutesDescriptionDescriptionModel2 = _interopRequireDefault(_middleRoutesDescriptionDescriptionModel);

var _middleRoutesEgg_groupEggGroupModel = require('./../middle/routes/egg_group/egg-group-model');

var _middleRoutesEgg_groupEggGroupModel2 = _interopRequireDefault(_middleRoutesEgg_groupEggGroupModel);

var _middleRoutesMoveMoveModel = require('./../middle/routes/move/move-model');

var _middleRoutesMoveMoveModel2 = _interopRequireDefault(_middleRoutesMoveMoveModel);

var _middleRoutesPokemonPokemonModel = require('./../middle/routes/pokemon/pokemon-model');

var _middleRoutesPokemonPokemonModel2 = _interopRequireDefault(_middleRoutesPokemonPokemonModel);

var _middleRoutesRegistryRegistryModel = require('./../middle/routes/registry/registry-model');

var _middleRoutesRegistryRegistryModel2 = _interopRequireDefault(_middleRoutesRegistryRegistryModel);

var _middleRoutesTypeTypeModel = require('./../middle/routes/type/type-model');

var _middleRoutesTypeTypeModel2 = _interopRequireDefault(_middleRoutesTypeTypeModel);

var pokeapi = 'http://pokeapi.co/',
    v1 = 'api/v1/',
    params = '?limit=10';

/*********************************
*  Initialize National Registry  *
*********************************/

var nationalRegistry;

_middleRoutesRegistryRegistryModel2['default'].findOne({ name: 'national' }, function (error, doc) {

    if (doc) {

        nationalRegistry = doc;
        return;
    }

    _middleRoutesRegistryRegistryModel2['default'].create({ name: 'national', pokemon: [] }, function (error, doc) {

        nationalRegistry = doc;
    });
});

/************
*  Updates  *
************/

function update() {

    _async2['default'].series([function (next) {

        updateDocs(pokeapi + v1 + 'type/' + params, 'name', _middleRoutesTypeTypeModel2['default'], next);
    }, function (next) {

        updateDocs(pokeapi + v1 + 'move/' + params, 'id', _middleRoutesMoveMoveModel2['default'], next);
    }, function (next) {

        updateDocs(pokeapi + v1 + 'ability/' + params, 'id', _middleRoutesAbilityAbilityModel2['default'], next);
    }, function (next) {

        updateDocs(pokeapi + v1 + 'egg/' + params, 'id', _middleRoutesEgg_groupEggGroupModel2['default'], next);
    }, function (next) {

        updateDocs(pokeapi + v1 + 'description/' + params, 'id', _middleRoutesDescriptionDescriptionModel2['default'], next);
    }, function (next) {

        updateDocs(pokeapi + v1 + 'pokemon/' + params, 'name', _middleRoutesPokemonPokemonModel2['default']);
    }]);
}

function updateDocs(url, comparitor, model, callback) {

    _restler2['default'].get(url).on('complete', function (docs) {

        _lodash2['default'].forEach(docs.objects, function (pulledDoc) {

            var search = {};
            search[comparitor] = pulledDoc[comparitor];

            model.findOne(search, function (error, storedDoc) {

                if (error) {
                    console.log(error);return;
                }

                if (storedDoc) {

                    beenModified(pulledDoc, storedDoc) && updateADoc(pulledDoc, storedDoc);

                    return;
                }

                massage(pulledDoc);

                createModel(model, pulledDoc);
            });
        });

        if (docs.meta && docs.meta.next) {

            updateDocs(pokeapi + docs.meta.next, comparitor, model, callback);
        } else {

            if (callback) {
                callback();
            }
        }
    });
}

function createModel(model, pulled) {

    if (model.modelName == 'Pokemon') {

        createPokemonModel(pulled);
    } else {

        model.create(pulled, function (error, doc) {

            if (error) {
                console.log(error);return;
            }
        });
    }
}

function createPokemonModel(pulled) {

    var sets = {

        abilities: buildWorkingSet(pulled.abilities),
        moves: buildWorkingSet(pulled.moves),
        eggGroups: buildWorkingSet(pulled.egg_groups),
        types: buildWorkingSet(pulled.types)
    };

    pulled.abilities = [];
    pulled.moves = [];
    pulled.egg_groups = [];
    pulled.types = [];

    _middleRoutesPokemonPokemonModel2['default'].create(pulled, function (error, doc) {

        if (error) {
            console.log(error);return;
        }

        setObjectIds(doc, _middleRoutesTypeTypeModel2['default'], sets.types, 'types');
        setObjectIds(doc, _middleRoutesAbilityAbilityModel2['default'], sets.abilities, 'abilities');
        setObjectIds(doc, _middleRoutesMoveMoveModel2['default'], sets.moves, 'moves');
        setObjectIds(doc, _middleRoutesEgg_groupEggGroupModel2['default'], sets.eggGroups, 'egg_groups');

        registerMon(doc);
    });
}

function buildWorkingSet(set) {

    var set = _lodash2['default'].map(set, function (one) {

        return one.name.charAt(0).toUpperCase() + one.name.slice(1);
    });

    return set;
}

function setObjectIds(doc, model, set, key, callBack) {

    model.find({ 'name': { $in: set } }, function (error, docs) {

        if (err) {
            console.log(error);return;
        }

        doc[key] = _lodash2['default'].map(docs, function (one) {
            return one._id;
        });
        doc.save();

        callBack && callBack();
    });
}

function beenModified(pulled, stored) {

    if (stored.modified !== pulled.modified) {

        return true;
    }

    return false;
}

function updateADoc(pulled, stored) {

    massage(pulled);

    _lodash2['default'].forEach(_lodash2['default'].keys(stored), function (key) {

        stored[key] = pulled[key];
    });

    stored.save();
}

function massage(doc) {

    if (doc && doc.pokemon) {

        _lodash2['default'].isArray(doc.pokemon) ? setNationalIds(doc.pokemon) : setNationalIds([doc.pokemon]);
    }
}

function setNationalIds(pokemon) {

    _lodash2['default'].forEach(pokemon, function (mon) {

        var id = parseInt(mon.resource_uri.match(/([0-9]+)/g)[1]);
        mon.national_id = id;
    });
}

/*********************
*  Massage Registry  *
*********************/

function registerMon(mon) {

    var poke = {

        name: mon.name,
        national_id: mon.national_id,
        types: mon.types
    };

    nationalRegistry.pokemon.push(poke);
    nationalRegistry.save();
}

function compareMon(poke, mon) {

    poke = poke.national_id;
    mon = mon.national_id;

    return poke < mon ? -1 : poke > mon ? 1 : 0;
}

/************
*  Exports  *
************/

exports['default'] = update;
module.exports = exports['default'];