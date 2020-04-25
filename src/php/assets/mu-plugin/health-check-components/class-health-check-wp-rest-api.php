<?php

class Healt_Check_WP_REST_API {

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_rest_route' ) );
	}

	public function register_rest_route() {
		register_rest_route(
			'health-check/troubleshooting-mode/v1',
			'/get-plugins',
			array(
				'method'              => 'GET',
				'callback'            => array( $this, 'get_plugins' ),
				'permission_callback' => function() {
					return current_user_can( 'view_site_health_checks' );
				}
			)
		);

		register_rest_route(
			'health-check/troubleshooting-mode/v1',
			'/get-themes',
			array(
				'method'              => 'GET',
				'callback'            => array( $this, 'get_themes' ),
				'permission_callback' => function() {
					return current_user_can( 'view_site_health_checks' );
				}
			)
		);

		register_rest_route(
			'health-check/troubleshooting-mode/v1',
			'/get-notices',
			array(
				'method'              => 'GET',
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
				'method'              => 'GET',
				'callback'            => array( $this, 'clear_notices' ),
				'permission_callback' => function() {
					return current_user_can( 'view_site_health_checks' );
				}
			)
		);
	}

	public function get_plugins() {
		// We need some admin functions to make this a better user experience, so include that file.
		if ( ! is_admin() ) {
			require_once( trailingslashit( ABSPATH ) . 'wp-admin/includes/plugin.php' );
		}

		$mu_plugin = Health_Check_Troubleshooting_MU::get_instance();

		$plugins = array();

		foreach ( $mu_plugin->get_active_plugins() as $single_plugin ) {
			$plugin_slug = explode( '/', $single_plugin );
			$plugin_slug = $plugin_slug[0];

			$plugin_data = get_plugin_data( trailingslashit( WP_PLUGIN_DIR ) . $single_plugin );

			$plugins[ $plugin_slug ] = array(
				'slug'     => $plugin_slug,
				'label'    => $plugin_data['Name'],
				'enabled'  => in_array( $plugin_slug, $mu_plugin->get_allowed_plugins(), true ),
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

		return $themes;
	}

	public function get_notices() {
		return get_option( 'health-check-dashboard-notices', array() );
	}
}

new Healt_Check_WP_REST_API();
