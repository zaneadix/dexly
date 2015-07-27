
import React              from 'react';
import PokemonSummaryView from './../pokemon-summary/pokemon-summary-view';

export default React.createClass({

	displayName: 'Registry',

	componentDidMount () {

		console.log('mounted')
		this.props.registry.on('sync', () => {

			this.forceUpdate() 
			console.log('hey')
		})
	},

	render () {

		console.log(this.props.registry.models)
		
		return (

			<div className="container">

				{this.props.registry.models.map( function (entry, index) {
					return (
						<PokemonSummaryView
							key={index}
							name={entry.name}
							nationalId={entry.nationalId}
						/>
					)
				})}

			</div>
		)
	}
})