
import React from 'react';

export default React.createClass({

	displayName: 'PokemonSummary',

	render () {

		return (
			<div className="col-sm-3 pokemon-summary">
				<span className="id">{this.props.nationalId}</span>
				<img src={'images/'+this.props.nationalId+'.png'} 
					 alt={this.props.name}
				/>
				<span className="name">{this.props.name}</span>
			</div>
		)
	}
})