import { registerStore } from '@wordpress/data';
import apiFetch from "@wordpress/api-fetch";

apiFetch.use( apiFetch.createNonceMiddleware( SiteHealth.nonce.api_nonce ) );

const SiteHealth_DefaultState_Tests = {
	tests: [],
};

const actions = {
	setTests( tests ) {
		return {
			type: 'SET_TESTS',
			tests,
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
	'site-health-tests', {
		reducer( state = SiteHealth_DefaultState_Tests, action ) {
			switch ( action.type ) {
				case 'SET_TESTS':
					return {
						...state,
						tests: action.tests
					};
			}

			return state;
		},

		actions,

		selectors: {
			getTest( state, item ) {
				return state.tests[ item ];
			},

			getTests( state ) {
				return state.tests;
			}
		},

		controls: {
			FETCH_FROM_API( action ) {
				return apiFetch( { path: action.path } );
			}
		},

		resolvers: {
			* getTests() {
				const path = '/wp-json/health-check/v1/get-tests';
				const tests = yield actions.fetchFromAPI( path );

				return actions.setTests( tests );
			}
		}
	}
);
