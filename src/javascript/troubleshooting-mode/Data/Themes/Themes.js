import { useSelect } from "@wordpress/data";

function Themes() {
	return useSelect ( ( select ) => {
		return select( 'site-health-themes' ).getThemes();
	} );
}

export default Themes;
