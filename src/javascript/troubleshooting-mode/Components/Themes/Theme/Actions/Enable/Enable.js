import { dispatch } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";

const SiteHealth_Themes_Enable_Failed = () => {
	dispatch( 'site-health-notices' ).getNotices();
};

const SiteHealth_Themes_Enable_Success = ( response ) => {
	dispatch( 'site-health-themes' ).setThemes( response );

	window.location.reload();
};

const SiteHealth_Themes_Enable = ( theme ) => {
	const path = "/wp-json/health-check/troubleshooting-mode/v1/set-theme";
	apiFetch( {
		path,
		method: 'POST',
		data: {
			theme: theme.slug,
		}
	} ).then( ( response ) => {
		SiteHealth_Themes_Enable_Success( response );
	} ).catch( () => {
		SiteHealth_Themes_Enable_Failed();
	} );
};

export default SiteHealth_Themes_Enable;
