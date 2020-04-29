import apiFetch from "@wordpress/api-fetch";
import { dispatch } from "@wordpress/data";

const SiteHealth_Notices_ClearNotices_Success = ( response ) => {
	dispatch( 'site-health-notices' ).setNotices( response );

	dispatch( 'site-health-notices' ).setClearing( false );
};

const SiteHealth_Notices_ClearNotices_Failed = ( response ) => {
	dispatch( 'site-health-notices' ).setClearing( false );
};

export const SiteHealth_Notices_ClearNotices = () => {
	dispatch( 'site-health-notices' ).setClearing( true );

	const path = '/wp-json/health-check/troubleshooting-mode/v1/clear-notices';
	apiFetch( { path } )
		.then( ( response ) => {
			SiteHealth_Notices_ClearNotices_Success( response );
		} )
		.catch( ( response ) => {
			SiteHealth_Notices_ClearNotices_Failed( response );
		} );
};
