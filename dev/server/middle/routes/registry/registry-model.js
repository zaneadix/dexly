
import mongoose from 'mongoose';

var RegistrySchema = new mongoose.Schema({

	name: String,

	pokemon: [{

		name: String,

		national_id: Number,

		types: [{

		  name: String

		}]

	}]
});

var Registry = mongoose.model('Registry', RegistrySchema);

Registry.message = ' registry created';

export default Registry;
