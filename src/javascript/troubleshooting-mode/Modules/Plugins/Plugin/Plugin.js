import React from 'react';
import { __ } from "@wordpress/i18n";

function Plugin( { plugin } ) {
	return (
		<li>
			{ plugin.label } - { plugin.enabled
				? <a href="">{ __( 'Disable plugin while troubleshooting', 'health-check' ) }</a>
				: <a href="">{ __( 'Enable plugin while troubleshooting', 'health-check' ) }</a>
			}
		</li>
	)
}

export default Plugin;
