import React from 'react';
import { useSelect } from "@wordpress/data";

function TestsData() {
	return useSelect ( ( select ) => {
		return select( 'site-health-tests' ).getTests();
	} );
}

export default TestsData;
