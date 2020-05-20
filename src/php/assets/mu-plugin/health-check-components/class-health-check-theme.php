<?php

class Health_Check_Theme {

	protected static $instance;

	private $default_theme = true;
	public $current_theme;
	private $current_theme_details;
	private $self_fetching_theme = false;

	private $default_themes = array(
		'twentytwenty',
		'twentynineteen',
		'twentyseventeen',
		'twentysixteen',
		'twentyfifteen',
		'twentyfourteen',
		'twentythirteen',
		'twentytwelve',
		'twentyeleven',
		'twentyten',
	);

	public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	public function __construct() {
		add_filter( 'pre_option_template', array( $this, 'health_check_troubleshoot_theme_template' ) );
		add_filter( 'pre_option_stylesheet', array( $this, 'health_check_troubleshoot_theme_stylesheet' ) );

		add_filter( 'user_has_cap', array( $this, 'remove_plugin_theme_install' ) );

		add_action( 'admin_notices', array( $this, 'prompt_install_default_theme' ) );

		$this->init();
	}

	public function init() {
		if ( ! Health_Check_Troubleshooting_MU::get_instance()->is_troubleshooting() ) {
			return;
		}

		$this->default_theme = ( 'yes' === get_option( 'health-check-default-theme', 'yes' ) ? true : false );
	}

	/**
	 * Remove the `Add` option for plugins and themes.
	 *
	 * When troubleshooting, adding or changing themes and plugins can
	 * lead to unexpected results. Remove these menu items to make it less
	 * likely that a user breaks their site through these.
	 *
	 * @param  array $caps Array containing the current users capabilities.
	 *
	 * @return array
	 */
	public function remove_plugin_theme_install( $caps ) {
		if ( ! Health_Check_Troubleshooting_MU::get_instance()->is_troubleshooting() ) {
			return $caps;
		}

		$caps['switch_themes'] = false;

		/*
		 * This is to early for `get_current_screen()`, so we have to do it the
		 * old fashioned way with `$_SERVER`.
		 */
		if ( 'plugin-install.php' === substr( $_SERVER['REQUEST_URI'], -18 ) ) {
			$caps['activate_plugins'] = false;
		}

		return $caps;
	}

	/**
	 * Add a prompt to install a default theme.
	 *
	 * If no default theme exists, we can't reliably assert if an issue is
	 * caused by the theme. In these cases we should provide an easy step
	 * to get to, and install, one of the default themes.
	 *
	 * @return void
	 */
	public function prompt_install_default_theme() {
		if ( ! Health_Check_Troubleshooting_MU::get_instance()->is_troubleshooting() || $this->has_default_theme() ) {
			return;
		}

		printf(
			'<div class="notice notice-warning dismissable"><p>%s</p><p><a href="%s" class="button button-primary">%s</a></p></div>',
			esc_html__( 'You don\'t have any of the default themes installed. A default theme helps you determine if your current theme is causing conflicts.', 'health-check' ),
			esc_url(
				admin_url(
					sprintf(
						'theme-install.php?theme=%s',
						$this->default_themes[0]
					)
				)
			),
			esc_html__( 'Install a default theme', 'health-check' )
		);
	}

	/**
	 * Check if a default theme exists.
	 *
	 * If a default theme exists, return the most recent one, if not return `false`.
	 *
	 * @return bool|string
	 */
	function has_default_theme() {
		foreach ( $this->default_themes as $default_theme ) {
			if ( $this->theme_exists( $default_theme ) ) {
				return $default_theme;
			}
		}

		return false;
	}

	/**
	 * Check if a theme exists by looking for the slug.
	 *
	 * @param string $theme_slug
	 *
	 * @return bool
	 */
	function theme_exists( $theme_slug ) {
		return is_dir( WP_CONTENT_DIR . '/themes/' . $theme_slug );
	}

	/**
	 * Check if theme overrides are active.
	 *
	 * @return bool
	 */
	function override_theme() {
		if ( ! Health_Check_Troubleshooting_MU::get_instance()->is_troubleshooting() ) {
			return false;
		}

		return true;
	}

	/**
	 * Override the default theme.
	 *
	 * Attempt to set one of the default themes, or a theme of the users choosing, as the active one
	 * during Troubleshooting Mode.
	 *
	 * @param $default
	 *
	 * @return bool|string
	 */
	function health_check_troubleshoot_theme_stylesheet( $default ) {
		if ( $this->self_fetching_theme ) {
			return $default;
		}

		if ( ! $this->override_theme() ) {
			return $default;
		}

		if ( empty( $this->current_theme_details ) ) {
			$this->self_fetching_theme   = true;
			$this->current_theme_details = wp_get_theme( $this->current_theme );
			$this->self_fetching_theme   = false;
		}

		// If no theme has been chosen, start off by troubleshooting as a default theme if one exists.
		$default_theme = $this->has_default_theme();
		if ( false === $this->current_theme ) {
			if ( $default_theme ) {
				return $default_theme;
			}
		}

		return $this->current_theme;
	}

	/**
	 * Override the default parent theme.
	 *
	 * If this is a child theme, override the parent and provide our users chosen themes parent instead.
	 *
	 * @param $default
	 *
	 * @return bool|string
	 */
	function health_check_troubleshoot_theme_template( $default ) {
		if ( $this->self_fetching_theme ) {
			return $default;
		}

		if ( ! $this->override_theme() ) {
			return $default;
		}

		if ( empty( $this->current_theme_details ) ) {
			$this->self_fetching_theme   = true;
			$this->current_theme_details = wp_get_theme( $this->current_theme );
			$this->self_fetching_theme   = false;
		}

		// If no theme has been chosen, start off by troubleshooting as a default theme if one exists.
		$default_theme = $this->has_default_theme();
		if ( false === $this->current_theme ) {
			if ( $default_theme ) {
				return $default_theme;
			}
		}

		if ( $this->current_theme_details->parent() ) {
			return $this->current_theme_details->get_template();
		}

		return $this->current_theme;
	}

	/**
	 * Set the currently active theme.
	 *
	 * @param string $theme Theme slug to be made active.
	 */
	public function set_active_theme( $theme ) {
		$this->current_theme = $theme;
		$this->current_theme_details = wp_get_theme( $theme );

		update_option( 'health-check-current-theme', $theme );
	}
}

Health_Check_Theme::get_instance();
