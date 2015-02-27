'use strict';

var mongoose = require('mongoose');

var PokemonSchema = new mongoose.Schema({

  abilities: [{

    type: mongoose.Schema.Types.ObjectId,

    ref: 'Ability'
  }],

  attack: Number,

  catch_rate: Number,

  defense: Number,

  egg_cycles: Number,

  egg_groups: [{

    type: mongoose.Schema.Types.ObjectId,

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

    type: mongoose.Schema.Types.ObjectId,

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

    type: mongoose.Schema.Types.ObjectId,

    ref: 'Type'
  }],

  weight: String

}, { versionKey: false });


PokemonSchema.statics = {

  findAndPopulate: function (query, res, next) {

    this.findOne(query, { _id : false , modified : false, __v : false }, function(err, mon) {

      mon.populate({path: 'types moves abilities egg_groups'}, function(err, mon) {

        if (err) {

          console.log(err);

          next(err);

          return;
        }

        res.json(mon);
      })
    })
  }
}

var Pokemon = mongoose.model('Pokemon', PokemonSchema)

Pokemon.message = ' added to Bill\'s PC'

module.exports = exports = Pokemon
