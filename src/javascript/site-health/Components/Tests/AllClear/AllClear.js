import React from 'react';
import { __ } from "@wordpress/i18n";

function AllClear() {
	return (
		<>
			<div className="site-status-all-clear">
				<p className="icon">
					<span className="dashicons dashicons-yes"/>
				</p>

				<p className="encouragement">
					{ __( 'Great job!', 'health-check' ) }
				</p>

				<p>
					{ __( 'Everything is running smoothly here.', 'health-check' ) }
				</p>
			</div>
		</>
	);
}

export default AllClear;
