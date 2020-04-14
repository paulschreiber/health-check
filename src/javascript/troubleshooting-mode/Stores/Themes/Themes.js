import { registerStore } from '@wordpress/data';
import apiFetch from "@wordpress/api-fetch";

apiFetch.use( apiFetch.createNonceMiddleware( HealthCheckTS.api_nonce ) );

const SiteHealth_TroubleshootingMode_DefaultState_Themes = {
	themes: [],
};

const actions = {
	setThemes( themes ) {
		return {
			type: 'SET_THEMES',
			themes,
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
	'site-health-themes', {
		reducer( state = SiteHealth_TroubleshootingMode_DefaultState_Themes, action ) {
			switch ( action.type ) {
				case 'SET_THEMES':
					return {
						...state,
						themes: action.themes
					};
			}

			return state;
		},

		actions,

		selectors: {
			getTheme( state, item ) {
				return state.themes[ item ];
			},

			getThemes( state ) {
				return state.themes;
			}
		},

		controls: {
			FETCH_FROM_API( action ) {
				return apiFetch( { path: action.path } );
			}
		},

		resolvers: {
			* getThemes() {
				const path = '/wp-json/health-check/troubleshooting-mode/v1/get-themes';
				const themes = yield actions.fetchFromAPI( path );

				return actions.setThemes( themes );
			}
		}
	}
);
