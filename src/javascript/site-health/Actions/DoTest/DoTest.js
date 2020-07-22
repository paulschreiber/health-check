import apiFetch from "@wordpress/api-fetch";
import { dispatch } from "@wordpress/data";

const SiteHealth_Tests_Success = ( response ) => {
	dispatch( 'site-health-notices' ).setNotices( response );

	dispatch( 'site-health-tests' ).setLoading( false );
};

const SiteHealth_Tests_Failed = ( response ) => {
	dispatch( 'site-health-tests' ).setLoading( false );
};

export const SiteHealth_Tests_Perform = ( test ) => {
	dispatch( 'site-health-tests' ).setLoading( true );

	const path = '/wp-json/health-check/site-health/v1/run-test';
	apiFetch( { path } )
		.then( ( response ) => {
			SiteHealth_Tests_Success( response );
		} )
		.catch( ( response ) => {
			SiteHealth_Tests_Failed( response );
		} );
};
