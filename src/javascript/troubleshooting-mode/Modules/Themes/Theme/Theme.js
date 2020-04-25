import React from 'react';
import { __, sprintf } from "@wordpress/i18n";

function Theme( { theme } ) {
	return (
		<li>
			{ theme.label }

			&nbsp; &mdash; &nbsp;

			{ ! theme.enabled
				? <a
					href={ theme.urls.enable }
					aria-label={ sprintf( __( 'Switch the active theme to %s', 'health-check' ), theme.label ) }
				>{ __( 'Switch to this theme', 'health-check' ) }</a>
				: <>{ __( 'Active theme', 'health-check' ) }</>
			}
		</li>
	)
}

export default Theme;
