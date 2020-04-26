import React from 'react';
import { __, sprintf } from "@wordpress/i18n";
import EnableTheme from "./Actions/Enable";

function Theme( { theme } ) {
	return (
		<li>
			{ theme.label }

			&nbsp; &mdash; &nbsp;

			{ ! theme.enabled
				? <button
					className="button-link"
					aria-label={ sprintf( __( 'Switch the active theme to %s', 'health-check' ), theme.label ) }
					onClick={ () => EnableTheme( theme ) }
				>{ __( 'Switch to this theme', 'health-check' ) }</button>
				: <>{ __( 'Active theme', 'health-check' ) }</>
			}
		</li>
	)
}

export default Theme;
