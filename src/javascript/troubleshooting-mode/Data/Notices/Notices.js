import { useSelect } from "@wordpress/data";

function isClearing() {
	return useSelect ( ( select ) => {
		return select( 'site-health-notices' ).isClearing();
	} );
}

function Notices() {
	return useSelect ( ( select ) => {
		return select( 'site-health-notices' ).getNotices();
	} );
}

export { isClearing as NoticesIsClearing };
export default Notices;
