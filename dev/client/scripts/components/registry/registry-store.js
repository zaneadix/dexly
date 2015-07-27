
import Store          from 'ampersand-rest-collection';
import PokemonSummary from './../pokemon-summary/pokemon-summary-model';

const Registry = Store.extend({

	model: PokemonSummary,

	url: '/registry',

	comparator: 'nationalId',

	initialize () {

		this.name = '';
	},

	parse (payload) {

		this.name = payload.name;

		console.log(payload)

		return payload.pokemon;
	}
})

export default new Registry();