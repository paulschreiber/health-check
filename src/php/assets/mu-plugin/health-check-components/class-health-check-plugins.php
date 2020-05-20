<?php

class Health_Check_Plugins {

	protected static $instance;

	private $override_active = true;

	private $active_plugins  = array();
	private $allowed_plugins = array();

	public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	public function __construct() {
		add_filter( 'option_active_plugins', array( $this, 'health_check_loopback_test_disable_plugins' ) );
		add_filter( 'option_active_sitewide_plugins', array( $this, 'health_check_loopback_test_disable_plugins' ) );

		$this->init();
	}

	public function init() {
		if ( ! Health_Check_Troubleshooting_MU::get_instance()->is_troubleshooting() ) {
			return;
		}

		$this->allowed_plugins = get_option( 'health-check-allowed-plugins', array() );
		$this->active_plugins  = $this->get_unfiltered_plugin_list();
	}

	public function get_active_plugins() {
		return $this->active_plugins;
	}

	public function get_allowed_plugins() {
		return $this->allowed_plugins;
	}

	/**
	 * Get the actual list of active plugins.
	 *
	 * When in Troubleshooting Mode we override the list of plugins,
	 * this function lets us grab the active plugins list without
	 * any interference.
	 *
	 * @return array Array of active plugins.
	 */
	public function get_unfiltered_plugin_list() {
		$this->override_active = false;
		$all_plugins           = get_option( 'active_plugins' );
		$this->override_active = true;

		return $all_plugins;
	}

	/**
	 * Filter the plugins that are activated in WordPress.
	 *
	 * @param array $plugins An array of plugins marked as active.
	 *
	 * @return array
	 */
	function health_check_loopback_test_disable_plugins( $plugins ) {
		if ( ! Health_Check_Troubleshooting_MU::get_instance()->is_troubleshooting() || ! $this->override_active ) {
			return $plugins;
		}

		// If we've received a comma-separated list of allowed plugins, we'll add them to the array of allowed plugins.
		if ( isset( $_GET['health-check-allowed-plugins'] ) ) {
			$this->allowed_plugins = explode( ',', $_GET['health-check-allowed-plugins'] );
		}

		foreach ( $plugins as $plugin_no => $plugin_path ) {
			// Split up the plugin path, [0] is the slug and [1] holds the primary plugin file.
			$plugin_parts = explode( '/', $plugin_path );

			// We may want to allow individual, or groups of plugins, so introduce a skip-mechanic for those scenarios.
			if ( in_array( $plugin_parts[0], $this->allowed_plugins, true ) ) {
				continue;
			}

			// Remove the reference to this plugin.
			unset( $plugins[ $plugin_no ] );
		}

		// Return a possibly modified list of activated plugins.
		return $plugins;
	}
}

Health_Check_Plugins::get_instance();
