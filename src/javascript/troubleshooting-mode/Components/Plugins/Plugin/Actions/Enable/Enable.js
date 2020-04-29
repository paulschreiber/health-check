import { dispatch } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";

const SiteHealth_Plugins_Enable_Failed = () => {
	dispatch( 'site-health-notices' ).getNotices();
};

const SiteHealth_Plugins_Enable_Success = ( response ) => {
	dispatch( 'site-health-plugins' ).setPlugins( response );

	window.location.reload();
};

const SiteHealth_Plugins_Enable = ( plugin ) => {
	const path = "/wp-json/health-check/troubleshooting-mode/v1/enable-plugin";
	apiFetch( {
		path,
		method: 'POST',
		data: {
			plugin: plugin.slug,
		}
	} ).then( ( response ) => {
		SiteHealth_Plugins_Enable_Success( response );
	} ).catch( () => {
		SiteHealth_Plugins_Enable_Failed();
	} );
};

export default SiteHealth_Plugins_Enable;
