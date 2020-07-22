import React from 'react';

import TestsData from "../../Data/TestsData";
import TestResultsData from "../../Data/TestResultsData";

import AllClear from "./AllClear";
import Description from "./Description";
import Results from "./Results";
import { __, sprintf } from "@wordpress/i18n";

function Tests() {
	const tests = TestsData();
	const goodResults = TestResultsData( 'good' );
	const recommendedResults = TestResultsData( 'recommended' );
	const criticalResults = TestResultsData( 'critical' );

	return (
		<>
			<Description/>

			{ ( Object.keys( recommendedResults ).length < 1 && Object.keys( criticalResults ).length < 1 ) &&
				<AllClear/>
			}

			{ Object.keys( criticalResults ).length >= 1 &&
				<Results
					title={ sprintf( __( '%d critical issues', 'health-check' ), Object.keys( criticalResults ).length ) }
					tests={ criticalResults }
				/>
			}

			{ Object.keys( recommendedResults ).length >= 1 &&
				<Results
					title={ sprintf( __( '%d recommended improvements', 'health-check' ), Object.keys( recommendedResults ).length ) }
					tests={ recommendedResults }
				/>
			}

			{ Object.keys( goodResults ).length >= 1 &&
				<>
					<div className="site-health-view-more">
						<button
							type="button"
							className="button site-health-view-passed"
							aria-expanded="false"
							aria-controls="health-check-issues-good"
						>
							{ __( 'Passed tests', 'health-check' ) }
							<span className="icon"/>
						</button>
					</div>

					<div className="site-health-issues-wrapper hidden" id="health-check-issues-good">
						<Results
							title={ sprintf( __( '%d items with no issues detected', 'health-check' ), Object.keys( goodResults ).length ) }
							tests={ goodResults }
						/>
					</div>
				</>
			}
		</>
	);
}

export default Tests;
