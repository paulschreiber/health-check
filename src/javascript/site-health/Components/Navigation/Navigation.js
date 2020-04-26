import React from 'react';
import { __ } from "@wordpress/i18n";

function Navigation() {
	return (
		<>
			<nav className="health-check-tabs-wrapper hide-if-no-js"
				 aria-label={ __( 'Secondary menu', 'health-check' ) }>

				<a href="" className="health-check-tab health-check-%s-tab active" aria-current="true">Status</a>
				<a href="" className="health-check-tab health-check-%s-tab %s">Info</a>
				<a href="" className="health-check-tab health-check-%s-tab %s">Troubleshooting</a>
				<a href="" className="health-check-tab health-check-%s-tab %s">Tools</a>

			</nav>
		</>
	);
}

export default Navigation;
