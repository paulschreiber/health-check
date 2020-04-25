import React from 'react';
import { useSelect } from "@wordpress/data";

function NoticesData() {
	return useSelect ( ( select ) => {
		return select( 'site-health-notices' ).getNotices();
	} );
}

export default NoticesData;
