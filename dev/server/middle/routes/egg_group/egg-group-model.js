'use strict'

import mongoose from 'mongoose';

var EggGroupSchema = new mongoose.Schema({

	id: Number,

	modified: String,

	name: String,

	pokemon: [{

		name: String,

		national_id: Number
	}]
})

var EggGroup = mongoose.model('EggGroup', EggGroupSchema)

EggGroup.message = ' is a type of egg that makes Pokemon'

export default EggGroup
