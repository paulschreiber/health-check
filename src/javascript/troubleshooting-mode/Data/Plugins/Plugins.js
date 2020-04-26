import { useSelect } from "@wordpress/data";

function Plugins() {
	return useSelect ( ( select ) => {
		return select( 'site-health-plugins' ).getPlugins();
	} );
}

export default Plugins;
