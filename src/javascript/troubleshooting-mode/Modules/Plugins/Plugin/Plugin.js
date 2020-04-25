import React from 'react';
import { __ } from "@wordpress/i18n";



function Plugin( { plugin } ) {
	return (
		<li>
			{ plugin.label }

			&nbsp; &mdash; &nbsp;

			{ plugin.enabled
				? <a
					href={ plugin.urls.disable }
					aria-label={ sprintf( __( 'Disable the plugin, %s, while troubleshooting.', 'health-check' ), plugin.label ) }
				>{ __( 'Disable', 'health-check' ) }</a>
				: <a
					href={ plugin.urls.enable }
					aria-label={ sprintf( __( 'Enable the plugin, %s, while troubleshooting.', 'health-check' ), plugin.label ) }
				>{ __( 'Enable', 'health-check' ) }</a>
			}
		</li>
	)
}

export default Plugin;
