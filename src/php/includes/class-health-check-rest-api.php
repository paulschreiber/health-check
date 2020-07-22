<?php

class Health_Check_Rest_API {

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
	}

	public function register_rest_routes() {
		register_rest_route(
			'health-check/site-health/v1',
			'/get-tests',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_tests' ),
				'permission_callback' => function() {
					return current_user_can( 'view_site_health_checks' );
				}
			)
		);

		register_rest_route(
			'health-check/site-health/v1',
			'/run-test',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'run_test' ),
				'args'                => array(
					'test' => array(
						'required'          => true,
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param );
						}
					)
				),
				'permission_callback' => function() {
					return current_user_can( 'view_site_health_checks' );
				}
			)
		);
	}

	public function get_tests() {
		$health_check = Health_Check_Site_Status::get_instance();

		$tests = $health_check->get_tests();

		// Pre-populate the test results for direct tests.
		foreach ( $tests['direct'] as $slug => $test ) {
			if ( is_string( $test['test'] ) ) {
				$test_function = sprintf(
					'get_test_%s',
					$test['test']
				);

				if ( method_exists( $health_check, $test_function ) && is_callable( array( $health_check, $test_function ) ) ) {
					/**
					 * Filter the output of a finished Site Health test.
					 *
					 * @since 5.3.0
					 *
					 * @param array $test_result {
					 *     An associated array of test result data.
					 *
					 *     @param string $label  A label describing the test, and is used as a header in the output.
					 *     @param string $status The status of the test, which can be a value of `good`, `recommended` or `critical`.
					 *     @param array  $badge {
					 *         Tests are put into categories which have an associated badge shown, these can be modified and assigned here.
					 *
					 *         @param string $label The test label, for example `Performance`.
					 *         @param string $color Default `blue`. A string representing a color to use for the label.
					 *     }
					 *     @param string $description A more descriptive explanation of what the test looks for, and why it is important for the end user.
					 *     @param string $actions     An action to direct the user to where they can resolve the issue, if one exists.
					 *     @param string $test        The name of the test being ran, used as a reference point.
					 * }
					 */
					$tests['direct'][ $slug ] = apply_filters( 'site_status_test_result', call_user_func( array( $health_check, $test_function ) ) );
					continue;
				}
			}

			if ( is_callable( $test['test'] ) ) {
				$tests['direct'][ $slug ] = apply_filters( 'site_status_test_result', call_user_func( $test['test'] ) );
			}
		}

		return $tests;
	}

	public function run_test( WP_REST_Request $request ) {
		$test = $request->get_param( 'test' );

		$health_check = Health_Check_Site_Status::get_instance();

		$tests = $health_check->get_tests();

		$result = null;

		if ( isset( $tests['direct'][ $test ] ) ) {

			if ( is_string( $tests['direct'][ $test ]['test'] ) ) {
				$test_function = sprintf(
					'get_test_%s',
					$tests['direct'][ $test ]['test']
				);

				if ( method_exists( $health_check, $test_function ) && is_callable( array( $health_check, $test_function ) ) ) {
					$result = apply_filters( 'site_status_test_result', call_user_func( array( $health_check, $test_function ) ) );
				}
			}

			if ( is_callable( $tests['direct'][ $test ]['test'] ) ) {
				$result = apply_filters( 'site_status_test_result', call_user_func( $tests['direct'][ $test ]['test'] ) );
			}
		}

		if ( isset( $tests['async'][ $test ] ) ) {
			if ( is_string( $tests['async'][ $test ]['test'] ) ) {
				$test_function = sprintf(
					'get_test_%s',
					$tests['async'][ $test ]['test']
				);

				if ( method_exists( $health_check, $test_function ) && is_callable( array( $health_check, $test_function ) ) ) {
					$result = apply_filters( 'site_status_test_result', call_user_func( array( $health_check, $test_function ) ) );
				}
			}

			if ( is_callable( $tests['async'][ $test ]['test'] ) ) {
				$result = apply_filters( 'site_status_test_result', call_user_func( $tests['async'][ $test ]['test'] ) );
			}
		}

		if ( null === $result ) {
			wp_send_json_error(
				array(
					'message' => sprintf(
						__( 'The test, %s, does not exist, or could not be loaded.', 'health-check' ),
						$test
					),
				),
				404
			);
		}

		return $result;
	}
}

new Health_Check_Rest_API();
