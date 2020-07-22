import React from 'react';
import { useSelect } from "@wordpress/data";

function TestResultsData( type ) {
	return useSelect( ( select ) => {
		return select( 'site-health-tests' ).getResults( type );
	} );
}

export default TestResultsData;
