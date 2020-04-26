import React from 'react';
import { __ } from "@wordpress/i18n";

function Description() {
	return (
		<>
			<h2>
				{ __( 'Site Health Status', 'health-check' ) }
			</h2>

			<p>
				{ __( 'The site health check shows critical information about your WordPress configuration and items that require your attention.', 'health-check' ) }
			</p>

		</>
	);
}

export default Description;
