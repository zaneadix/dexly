
import mongoose from 'mongoose';

var DescriptionSchema = new mongoose.Schema({

    description: String,

    games: [{

        name: String
    }],

    id: Number,

    modified: String,

    name: String,

    pokemon: {

        name: String,

        national_id: Number
    }
})

var Description = mongoose.model('Description', DescriptionSchema)

Description.message = ' description obtained'

export default Description
