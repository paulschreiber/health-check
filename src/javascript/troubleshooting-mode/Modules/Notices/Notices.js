import React from 'react';
import { useSelect } from "@wordpress/data";
import Notice from "./Notice";
import { __ } from "@wordpress/i18n";

function Notices() {
	const notices = useSelect ( ( select ) => {
		return select( 'site-health-notices' ).getNotices();
	} );

	if ( ! notices.length ) {
		return (
			<div className="no-notices">
				<p>
					There are no notices to show.
				</p>
			</div>
		);
	}

	return (
		<>
			<ul
				role="list"
				id="health-check-notices">

				{ notices.map( ( notice, index ) => (
					<Notice
						key={ index }
						notice={ notice }
					/>
				) ) }

			</ul>

			<div
				className="dismiss-notices">
				<button>
					{ __( 'Dismiss notices', 'health-check' ) }
				</button>
			</div>
		</>
	)
}

export default Notices;
