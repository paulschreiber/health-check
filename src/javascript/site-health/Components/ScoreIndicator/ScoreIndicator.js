import React from 'react';
import { __ } from "@wordpress/i18n";

function ScoreIndicator() {
	return (
		<>
			<div className="health-check-title-section site-health-progress-wrapper loading hide-if-no-js">
				<div className="site-health-progress">
					<svg role="img" aria-hidden="true" focusable="false" width="100%" height="100%"
						 viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<circle r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48"
								strokeDashoffset="0"/>
						<circle id="bar" r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48"
								strokeDashoffset="0"/>
					</svg>
				</div>

				<div className="site-health-progress-label">
					<span dangerouslySetInnerHTML={{ __html: __( 'Results are still loading&hellip;', 'health-check' ) }} />
				</div>
			</div>
		</>
	);
}

export default ScoreIndicator;
