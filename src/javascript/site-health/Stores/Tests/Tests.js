import { registerStore } from '@wordpress/data';
import apiFetch from "@wordpress/api-fetch";

apiFetch.use( apiFetch.createNonceMiddleware( SiteHealth.nonce.api_nonce ) );

const SiteHealth_DefaultState_Tests = {
	tests: [],
	isLoading: true,
	results: {
		good: [],
		recommended: [],
		critical: [],
	},
};

const actions = {
	setLoading( loading ) {
		return {
			type: 'SET_LOADING',
			loading
		};
	},

	setTests( tests ) {
		return {
			type: 'SET_TESTS',
			tests,
		};
	},

	setTestResult( test, result ) {
		return {
			type: 'SET_TEST_RESULT',
			test,
			result,
		};
	},

	setAPIResponse( response ) {
		return {
			type: 'SET_API_RESPONSE',
			response,
		}
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
				case 'SET_LOADING':
					return {
						...state,
						isLoading: action.loading
					};

				case 'SET_TESTS':
					return {
						...state,
						tests: action.tests
					};

				case 'SET_TEST_RESULT':
					let results = state.results;
					results[ action.result ][ action.test.name ] = action.test;

					return {
						...state,
						results: currentResults
					};

				case 'SET_API_RESPONSE':
					return {
						...state,
						tests: action.response.tests,
						results: action.response.results
					};
			}

			return state;
		},

		actions,

		selectors: {
			getTest( state, item ) {
				return state.tests[ item ];
			},

			getResults( state, type ) {
				return state.results[ type ];
			},

			getTests( state ) {
				return state.tests;
			},

			isLoading( state ) {
				return state.isLoading;
			}
		},

		controls: {
			FETCH_FROM_API( action ) {
				return apiFetch( { path: action.path } );
			}
		},

		resolvers: {
			* getTests() {
				const path = '/wp-json/health-check/site-health/v1/get-tests';
				const response = yield actions.fetchFromAPI( path );

				return actions.setAPIResponse( response );
			}
		}
	}
);
