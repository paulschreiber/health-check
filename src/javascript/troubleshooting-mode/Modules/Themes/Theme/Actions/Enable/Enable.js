import { dispatch } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";

const SiteHealth_Themes_Enable_Failed = ( response ) => {
	console.log( response );
};

const SiteHealth_Themes_Enable_Success = ( response ) => {
	console.log( response );
	dispatch( 'site-health-themes' ).setThemes( response.data );
};

const SiteHealth_Themes_Enable = ( slug ) => {
	const path = "/wp-json/health-check/troubleshooting-mode/v1/set-theme";
	apiFetch( {
		path,
		method: 'POST',
		data: {
			theme: slug,
		}
	} ).then( ( response ) => {
		SiteHealth_Themes_Enable_Success( response );
	} ).catch( ( response ) => {
		SiteHealth_Themes_Enable_Failed( response );
	} );
};

export default SiteHealth_Themes_Enable;
