import React from 'react';
import { useSelect } from "@wordpress/data";

function PluginsData() {
	return useSelect ( ( select ) => {
		return select( 'site-health-plugins' ).getPlugins();
	} );
}

export default PluginsData;
