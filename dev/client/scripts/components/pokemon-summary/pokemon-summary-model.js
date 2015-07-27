
import Model from 'ampersand-model';

export default Model.extend({

	props: {

		name       : 'string',
		nationalId : 'number'
	},

	parse (payload) {

		payload.nationalId = payload.national_id;
		delete payload.national_id;

		return payload;
	}
})