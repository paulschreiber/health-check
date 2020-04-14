import { registerStore } from '@wordpress/data';
import apiFetch from "@wordpress/api-fetch";

apiFetch.use( apiFetch.createNonceMiddleware( HealthCheckTS.api_nonce ) );

const SiteHealth_TroubleshootingMode_DefaultState_Notices = {
	notices: [],
};

const actions = {
	setNotices( notices ) {
		return {
			type: 'SET_NOTICES',
			notices,
		};
	},

	fetchFromAPI( path ) {
		return {
			type: 'FETCH_FROM_API',
			path,
		};
	},
};

registerStore(
	'site-health-notices', {
		reducer( state = SiteHealth_TroubleshootingMode_DefaultState_Notices, action ) {
			switch ( action.type ) {
				case 'SET_NOTICES':
					return {
						...state,
						notices: action.notices
					};
			}

			return state;
		},

		actions,

		selectors: {
			getNotices( state ) {
				return state.notices;
			}
		},

		controls: {
			FETCH_FROM_API( action ) {
				return apiFetch( { path: action.path } );
			}
		},

		resolvers: {
			* getNotices() {
				const path = '/wp-json/health-check/troubleshooting-mode/v1/get-notices';
				const notices = yield actions.fetchFromAPI( path );

				return actions.setNotices( notices );
			}
		}
	}
);
