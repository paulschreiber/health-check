<?php

class Health_Check_Notices {

	public static function get() {
		return get_option( 'health-check-dashboard-notices', array() );
	}

	public function remove( $entry_number ) {
		// Decrease the entry number as PHP starts at 0, but humans start at 1.
		$entry_number--;

		$notices = get_option( 'health-check-dashboard-notices', array() );

		unset( $notices[ $entry_number ] );

		update_option( 'health-check-dashboard-notices', $notices );
	}

	public static function clear() {
		return update_option( 'health-check-dashboard-notices', array() );
	}

	public static function add( $message, $severity = 'notice' ) {
		$notices = get_option( 'health-check-dashboard-notices', array() );

		$notices[] = array(
			'severity' => $severity,
			'message'  => $message,
			'time'     => gmdate( 'Y-m-d H:i' ),
		);

		update_option( 'health-check-dashboard-notices', $notices );
	}
}
