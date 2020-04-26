import { registerStore } from '@wordpress/data';
import apiFetch from "@wordpress/api-fetch";

const SiteHealth_TroubleshootingMode_DefaultState_Notices = {
	notices: [],
	isClearing: false,
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

	setClearing( clearing ) {
		return {
			type: 'SET_CLEARING',
			clearing,
		};
	}
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

				case 'SET_CLEARING':
					return {
						...state,
						isClearing: action.clearing
					};
			}

			return state;
		},

		actions,

		selectors: {
			getNotices( state ) {
				return state.notices;
			},

			isClearing( state ) {
				return state.isClearing;
			},
		},

		controls: {
			FETCH_FROM_API( action ) {
				return apiFetch( { path: action.path } );
			},
		},

		resolvers: {
			* getNotices() {
				const path = '/wp-json/health-check/troubleshooting-mode/v1/get-notices';
				const notices = yield actions.fetchFromAPI( path );

				return actions.setNotices( notices );
			},
		}
	}
);
