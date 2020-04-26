import { registerStore } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const SiteHealth_TroubleshootingMode_DefaultState_Plugins = {
	plugins: {},
};

const actions = {
	setPlugins( plugins ) {
		return {
			type: 'SET_PLUGINS',
			plugins,
		};
	},

	enablePlugin( plugin ) {
		return {
			type: 'ENABLE_PLUGIN',
			plugin,
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
	'site-health-plugins', {
		reducer( state = SiteHealth_TroubleshootingMode_DefaultState_Plugins, action ) {
			switch ( action.type ) {
				case 'SET_PLUGINS':
					return {
						...state,
						plugins: action.plugins
					};
				case 'ENABLE_PLUGIN':
					return {
						...state,
						plugins: {
							...state.plugins,
							[ action.plugin.slug ]: action.plugin,
						},
					};
				case 'DISABLE_PLUGIN':
					return {
						...state,
						plugins: {
							...state.plugins,
							[ action.plugin.slug ]: action.plugin,
						},
					};
			}

			return state;
		},

		actions,

		selectors: {
			getPlugins( state ) {
				return state.plugins;
			}
		},

		controls: {
			FETCH_FROM_API( action ) {
				return apiFetch( { path: action.path } )
			}
		},

		resolvers: {
			* getPlugins() {
				const path = '/wp-json/health-check/troubleshooting-mode/v1/get-plugins';
				const plugins = yield actions.fetchFromAPI( path );

				return actions.setPlugins( plugins );
			}
		}
	}
);
