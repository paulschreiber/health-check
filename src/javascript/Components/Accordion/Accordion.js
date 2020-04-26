import React from 'react';

function Accordion( props ) {
	return (
		<dl
			role="presentation"
			className="health-check-accordion">

			{ props.children }

		</dl>
	)
}

export default Accordion;
