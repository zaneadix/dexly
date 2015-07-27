'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var PokemonSchema = new _mongoose2['default'].Schema({

    abilities: [{

        type: _mongoose2['default'].Schema.Types.ObjectId,

        ref: 'Ability'
    }],

    attack: Number,

    catch_rate: Number,

    defense: Number,

    egg_cycles: Number,

    egg_groups: [{

        type: _mongoose2['default'].Schema.Types.ObjectId,

        ref: 'EggGroup'
    }],

    ev_yield: String,

    evolutions: [{

        level: Number,

        method: String,

        to: String
    }],

    exp: Number,

    growth_rate: String,

    happiness: Number,

    height: String,

    hp: Number,

    male_female_ratio: String,

    modified: String,

    moves: [{

        type: _mongoose2['default'].Schema.Types.ObjectId,

        ref: 'Move'
    }],

    name: String,

    national_id: Number,

    sp_atk: Number,

    sp_def: Number,

    species: String,

    speed: Number,

    total: Number,

    types: [{

        type: _mongoose2['default'].Schema.Types.ObjectId,

        ref: 'Type'
    }],

    weight: String

}, { versionKey: false });

PokemonSchema.statics = {

    findAndPopulate: function findAndPopulate(query, res, next) {

        this.findOne(query, { _id: false, modified: false, __v: false }, function (err, mon) {

            mon.populate({ path: 'types moves abilities egg_groups' }, function (err, mon) {

                if (err) {

                    console.log(err);

                    next(err);

                    return;
                }

                res.json(mon);
            });
        });
    }
};

var Pokemon = _mongoose2['default'].model('Pokemon', PokemonSchema);

Pokemon.message = ' added to Bill\'s PC';

exports['default'] = Pokemon;
module.exports = exports['default'];