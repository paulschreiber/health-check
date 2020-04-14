import React from 'react';
import { __ } from "@wordpress/i18n";

function Theme( { theme } ) {
	return (
		<li>
			{ theme.label } { ! theme.enabled && (
					<>
						- <a href="">{ __( 'Switch to this theme', 'health-check' ) }</a>
					</>
				)
			}
		</li>
	)
}

export default Theme;
