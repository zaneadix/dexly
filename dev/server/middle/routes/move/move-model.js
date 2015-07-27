
import mongoose from 'mongoose';

var MoveSchema = new mongoose.Schema({

	accuracy: Number,

	category: String,

	description: String,

	id: Number,

	modified: String,

	name: String,

	power: Number,

	pp: Number
})

var Move = mongoose.model('Move', MoveSchema)

Move.message = ' is a move used by Pokemon'

export default Move;
