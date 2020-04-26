import React from 'react';
import Notice from "./Notice";
import { __ } from "@wordpress/i18n";
import NoticesData from "../../Data/Notices";
import { SiteHealth_Notices_ClearNotices } from "../../Data/Notices/Actions/Clear";
import { NoticesIsClearing } from "../../Data/Notices/Notices";

function Notices() {
	const notices = NoticesData();
	const isClearing = NoticesIsClearing();

	if ( ! notices.length ) {
		return (
			<div className="no-notices">
				<p>
					{ __( 'There are no notices to show.', 'health-check' ) }
				</p>
			</div>
		);
	}

	return (
		<>
			<ul
				role="list"
				id={ "health-check-notices " + ( isClearing ? 'clearing' : '' ) }>

				{ notices.map( ( notice, index ) => (
					<Notice
						key={ index }
						notice={ notice }
					/>
				) ) }

			</ul>

			<div
				className="dismiss-notices">
				<button
					className="button button-secondary"
					onClick={ () => SiteHealth_Notices_ClearNotices() }
				>
					{ __( 'Dismiss notices', 'health-check' ) }
				</button>
			</div>
		</>
	)
}

export default Notices;
