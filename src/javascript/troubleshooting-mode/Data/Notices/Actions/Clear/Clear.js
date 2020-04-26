import apiFetch from "@wordpress/api-fetch";
import { dispatch } from "@wordpress/data";

const SiteHealth_Notices_ClearNotices_Success = () => {
	dispatch( 'site-health-notices' ).setClearing( false );
};

const SiteHealth_Notices_ClearNotices_Failed = () => {
	dispatch( 'site-health-notices' ).setClearing( false );
};

export const SiteHealth_Notices_ClearNotices = () => {
	dispatch( 'site-health-notices' ).setClearing( true );

	const path = '/wp-json/health-check/troubleshooting-mode/v1/clear-notices';
	const notices = apiFetch( { path } );

	dispatch( 'site-health-notices' ).setNotices( notices );
};
