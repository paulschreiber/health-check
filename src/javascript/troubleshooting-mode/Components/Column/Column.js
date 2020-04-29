import React from 'react';

function Column( { extraClasses = "", children } ) {


	return (
		<div
			className={ "health-check-column " + extraClasses }
		>
			{ children }
		</div>
	)
}

export default Column;
