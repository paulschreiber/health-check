import React from 'react';

function Button( props, href, className ) {
	return (
		<a
			href={ href }
			className={ className }
		>
			{ props.children }
		</a>
	)
}

export default Button;
