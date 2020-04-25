import React from 'react';
import { useSelect } from "@wordpress/data";

function ThemesData() {
	return useSelect ( ( select ) => {
		return select( 'site-health-themes' ).getThemes();
	} );
}

export default ThemesData;
