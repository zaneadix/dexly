
import app        from 'ampersand-app';
import router     from './router';
import dispatcher from './dispatcher';
import registry   from './components/registry/registry-store';
import React      from 'react';
import FilterView from './components/filter/filter-view'

app.extend({

	init () {

		this.header     = document.getElementsByTagName('header')[0];
		this.main       = document.getElementById('heart');
		this.registry   = registry;
		this.dispatcher = dispatcher;

		registry.fetch();

		React.render(
			<FilterView />,
			this.header
		)

		router.history.start();
	}
});

app.init();