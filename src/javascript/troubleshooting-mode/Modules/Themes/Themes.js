import React from 'react';
import Theme from "./Theme";
import ThemesData from "../../Data/Themes";

function Themes() {
	const themes = ThemesData();

	if ( 0 === Object.keys( themes ).length ) {
		return (
			<div className="no-notices">
				<p>
					There are no themes to list.
				</p>
			</div>
		);
	}

	return (
		<ul
			role="list"
			id="health-check-themes">

			{ Object.keys( themes ).map( ( slug, index ) => (
				<Theme
					key={ slug }
					theme={ themes[ slug ] }
				/>
			) ) }

		</ul>
	)
}

export default Themes;
