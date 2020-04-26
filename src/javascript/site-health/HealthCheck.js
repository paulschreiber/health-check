import React from 'react';
import { __ } from "@wordpress/i18n";

import "./Stores/Tests";

import Header from "./Components/Header";
import Tests from "./Components/Tests/Tests";



function HealthCheck() {
	return (
		<>
			<Header/>

			<div className="notice notice-error hide-if-js">
				<p>{ __( 'The Site Health check requires JavaScript.', 'health-check' ) }</p>
			</div>

			<div className="health-check-body hide-if-no-js">

				<Tests/>

			</div>
		</>
	)
}

export default HealthCheck;
