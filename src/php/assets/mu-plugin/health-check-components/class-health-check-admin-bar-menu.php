<?php

class Health_Check_Admin_Bar_Menu {
	public function __construct() {
		add_action( 'admin_bar_menu', array( $this, 'health_check_troubleshoot_menu_bar' ), 999 );
	}

	/**
	 * Extend the admin bar.
	 *
	 * When in Troubleshooting Mode, introduce a new element to the admin bar to show
	 * enabled and disabled plugins (if conditions are met), switch between themes
	 * and disable Troubleshooting Mode altogether.
	 *
	 * @param WP_Admin_Bar $wp_menu
	 *
	 * @return void
	 */
	function health_check_troubleshoot_menu_bar( $wp_menu ) {
		if ( ! Health_Check_Troubleshooting_MU::get_instance()->is_troubleshooting() ) {
			return;
		}

		// We need some admin functions to make this a better user experience, so include that file.
		if ( ! is_admin() ) {
			require_once( trailingslashit( ABSPATH ) . 'wp-admin/includes/plugin.php' );
		}

		// Ensure the theme functions are available to us on every page.
		include_once( trailingslashit( ABSPATH ) . 'wp-admin/includes/theme.php' );

		// Add top-level menu item.
		$wp_menu->add_menu(
			array(
				'id'    => 'health-check',
				'title' => esc_html__( 'Troubleshooting Mode', 'health-check' ),
				'href'  => admin_url( '/' ),
			)
		);

		// Add a link to manage plugins if there are more than 20 set to be active.
		if ( count( Health_Check_Plugins::get_instance()->get_active_plugins() ) > 20 ) {
			$wp_menu->add_node(
				array(
					'id'     => 'health-check-plugins',
					'title'  => esc_html__( 'Manage active plugins', 'health-check' ),
					'parent' => 'health-check',
					'href'   => admin_url( 'plugins.php' ),
				)
			);
		} else {
			$wp_menu->add_node(
				array(
					'id'     => 'health-check-plugins',
					'title'  => esc_html__( 'Plugins', 'health-check' ),
					'parent' => 'health-check',
					'href'   => admin_url( 'plugins.php' ),
				)
			);

			$wp_menu->add_group(
				array(
					'id'     => 'health-check-plugins-enabled',
					'parent' => 'health-check-plugins',
				)
			);
			$wp_menu->add_group(
				array(
					'id'     => 'health-check-plugins-disabled',
					'parent' => 'health-check-plugins',
				)
			);

			foreach ( Health_Check_Plugins::get_instance()->get_active_plugins() as $single_plugin ) {
				$plugin_slug = explode( '/', $single_plugin );
				$plugin_slug = $plugin_slug[0];

				$plugin_data = get_plugin_data( trailingslashit( WP_PLUGIN_DIR ) . $single_plugin );

				$enabled = true;

				if ( in_array( $plugin_slug, Health_Check_Plugins::get_instance()->get_allowed_plugins(), true ) ) {
					$label = sprintf(
					// Translators: %s: Plugin slug.
						esc_html__( 'Disable %s', 'health-check' ),
						sprintf(
							'<strong>%s</strong>',
							$plugin_data['Name']
						)
					);
					$url = add_query_arg(
						array(
							'health-check-troubleshoot-disable-plugin' => $plugin_slug,
						)
					);
				} else {
					$enabled = false;
					$label   = sprintf(
					// Translators: %s: Plugin slug.
						esc_html__( 'Enable %s', 'health-check' ),
						sprintf(
							'<strong>%s</strong>',
							$plugin_data['Name']
						)
					);
					$url = add_query_arg(
						array(
							'health-check-troubleshoot-enable-plugin' => $plugin_slug,
						)
					);
				}

				$wp_menu->add_node(
					array(
						'id'     => sprintf(
							'health-check-plugin-%s',
							$plugin_slug
						),
						'title'  => $label,
						'parent' => ( $enabled ? 'health-check-plugins-enabled' : 'health-check-plugins-disabled' ),
						'href'   => $url,
					)
				);
			}
		}

		$wp_menu->add_node(
			array(
				'id'     => 'health-check-theme',
				'title'  => esc_html__( 'Themes', 'health-check' ),
				'parent' => 'health-check',
				'href'   => admin_url( 'themes.php' ),
			)
		);

		$themes = wp_prepare_themes_for_js();

		foreach ( $themes as $theme ) {
			$node = array(
				'id'     => sprintf(
					'health-check-theme-%s',
					sanitize_title( $theme['id'] )
				),
				'title'  => sprintf(
					'%s %s',
					( $theme['active'] ? esc_html_x( 'Active:', 'Prefix for the active theme in troubleshooting mode', 'health-check' ) : esc_html_x( 'Switch to', 'Prefix for inactive themes in troubleshooting mode', 'health-check' ) ),
					$theme['name']
				),
				'parent' => 'health-check-theme',
			);

			if ( ! $theme['active'] ) {
				$node['href'] = add_query_arg(
					array(
						'health-check-change-active-theme' => $theme['id'],
					)
				);
			}

			$wp_menu->add_node( $node );
		}

		// Add a link to disable Troubleshooting Mode.
		$wp_menu->add_node(
			array(
				'id'     => 'health-check-disable',
				'title'  => esc_html__( 'Disable Troubleshooting Mode', 'health-check' ),
				'parent' => 'health-check',
				'href'   => add_query_arg(
					array(
						'health-check-disable-troubleshooting' => true,
					)
				),
			)
		);
	}

}

new Health_Check_Admin_Bar_Menu();
