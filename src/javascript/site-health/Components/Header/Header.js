import React from 'react';
import { __ } from "@wordpress/i18n";
import ScoreIndicator from "../ScoreIndicator";
import Navigation from "../Navigation";

function Header() {
	return (
		<>
			<div className="health-check-header">
				<div className={ "health-check-title-section" }>
					<h1>{ __( 'Site Health', 'health-check' ) }</h1>
				</div>

				<ScoreIndicator/>

				<Navigation/>

				<div className="wp-clearfix"/>
			</div>

			<hr className="wp-header-end"/>
		</>
	);
}

export default Header;
