
import React from 'react';

export default React.createClass({

	displayName: 'Filter',

	render () {

		return (

			<div>
				<div className="search container-fluid">
					<input type="text" placeholder="choose"/>
				</div>
				<div className="filter container-fluid">
					<button>Drop Down</button>
				</div>
			</div>
		)
	}
})