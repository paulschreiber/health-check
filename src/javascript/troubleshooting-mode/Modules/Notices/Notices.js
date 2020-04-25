import React from 'react';
import { useSelect } from "@wordpress/data";
import Notice from "./Notice";
import { __ } from "@wordpress/i18n";
import NoticesData from "../../Data/NoticesData";

function Notices() {
	const notices = NoticesData();

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
				<a
					href="?health-check-dismiss-notices=true"
					className="button button-secondary"
				>
					{ __( 'Dismiss notices', 'health-check' ) }
				</a>
			</div>
		</>
	)
}

export default Notices;
