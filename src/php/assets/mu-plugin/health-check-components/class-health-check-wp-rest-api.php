<?php

class Health_Check_WP_REST_API {

	public function __construct() {
		if ( ! Health_Check_Troubleshooting_MU::get_instance()->is_troubleshooting() ) {
			return;
		}

		add_action( 'rest_api_init', array( $this, 'register_rest_route' ) );
	}

	public function register_rest_route() {
		register_rest_route(
			'health-check/troubleshooting-mode/v1',
			'/get-plugins',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_plugins' ),
				'permission_callback' => function() {
					return current_user_can( 'view_site_health_checks' );
				}
			)
		);

		register_rest_route(
			'health-check/troubleshooting-mode/v1',
			'/enable-plugin',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'enable_plugin' ),
				'args'                => array(
					'plugin' => array(
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

		register_rest_route(
			'health-check/troubleshooting-mode/v1',
			'/disable-plugin',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'disable_plugin' ),
				'args'                => array(
					'plugin' => array(
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

		register_rest_route(
			'health-check/troubleshooting-mode/v1',
			'/get-themes',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_themes' ),
				'permission_callback' => function() {
					return current_user_can( 'view_site_health_checks' );
				}
			)
		);

		register_rest_route(
			'health-check/troubleshooting-mode/v1',
			'/set-theme',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'set_theme' ),
				'args'                => array(
					'theme' => array(
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

		register_rest_route(
			'health-check/troubleshooting-mode/v1',
			'/get-notices',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_notices' ),
				'permission_callback' => function() {
					return current_user_can( 'view_site_health_checks' );
				}
			)
		);

		register_rest_route(
			'health-check/troubleshooting-mode/v1',
			'/clear-notices',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'clear_notices' ),
				'permission_callback' => function() {
					return current_user_can( 'view_site_health_checks' );
				}
			)
		);
	}

	public function enable_plugin( WP_REST_Request $request ) {
		$enable_plugin = $request->get_param( 'plugin' );



		return $this->get_plugins();
	}

	public function get_plugins() {
		// We need some admin functions to make this a better user experience, so include that file.
		if ( ! is_admin() ) {
			require_once( trailingslashit( ABSPATH ) . 'wp-admin/includes/plugin.php' );
		}

		$plugins = array();

		foreach ( Health_Check_Plugins::get_instance()->get_active_plugins() as $single_plugin ) {
			$plugin_slug = explode( '/', $single_plugin );
			$plugin_slug = $plugin_slug[0];

			$plugin_data = get_plugin_data( trailingslashit( WP_PLUGIN_DIR ) . $single_plugin );

			$plugins[ $plugin_slug ] = array(
				'slug'     => $plugin_slug,
				'label'    => $plugin_data['Name'],
				'enabled'  => in_array( $plugin_slug, Health_Check_Plugins::get_instance()->get_allowed_plugins(), true ),
				'urls'     => array(
					'enable'  => add_query_arg(
						array(
							'health-check-troubleshooting-enable-plugin' => $plugin_slug,
						),
						admin_url()
					),
					'disable' => add_query_arg(
						array(
							'health-check-troubleshooting-disable-plugin' => $plugin_slug,
						),
						admin_url()
					),
				)
			);
		}

		return $plugins;
	}

	public function set_theme( WP_REST_Request $request ) {
		$new_theme = $request->get_param( 'theme' );

		Health_Check_Theme::get_instance()->set_active_theme( $new_theme );

		$themes = $this->get_themes();

		foreach ( $themes as $theme => $data ) {
			if ( $theme === $new_theme ) {
				$themes[ $theme ]['enabled'] = true;
			} else {
				$themes[ $theme ]['enabled'] = false;
			}
		}

		return $themes;
	}

	public function get_themes() {
		// Ensure the theme functions are available to us on every page.
		include_once( trailingslashit( ABSPATH ) . 'wp-admin/includes/theme.php' );

		$theme_list = wp_prepare_themes_for_js();

		$themes = array();

		foreach ( $theme_list as $theme ) {
			$themes[ $theme['id'] ] = array(
				'slug'     => $theme['id'],
				'label'    => $theme['name'],
				'enabled'  => $theme['active'],
				'urls'     => array(
					'enable'  => add_query_arg(
						array(
							'health-check-change-active-theme' => $theme['id']
						),
						admin_url()
					),
				)
			);
		}

		ksort( $themes );

		return $themes;
	}

	public function get_notices() {
		return Health_Check_Notices::get();
	}

	public function clear_notices() {
		Health_Check_Notices::clear();

		return array();
	}
}

new Health_Check_WP_REST_API();
