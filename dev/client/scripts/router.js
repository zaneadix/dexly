
import React        from 'react';
import Router       from 'ampersand-router';
import app          from 'ampersand-app';

import RegistryView from './components/registry/registry-view';


const AppRouter = Router.extend({

	routes: {
		''        : 'pokemonRegistry',
		'pokemon' : 'pokemonDetail'
	},

	pokemonRegistry () {

		React.render(

			<RegistryView registry={app.registry}/>, 
			app.main
		);
	},

	pokemonDetail () {

	}
})

export default new AppRouter();