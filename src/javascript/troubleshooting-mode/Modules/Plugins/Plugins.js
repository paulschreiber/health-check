import React from 'react';
import { useSelect } from "@wordpress/data";
import Plugin from "./Plugin";
import PluginsData from "../../Data/PluginsData";

function Plugins() {
	const plugins = PluginsData();

	if ( 0 === Object.keys( plugins ).length ) {
		return (
			<div className="no-notices">
				<p>
					There are no plugins to list.
				</p>
			</div>
		);
	}

	return (
		<ul
			role="list"
			id="health-check-plugins">

			{ Object.keys( plugins ).map( ( slug, index )  => {
				return (
					<Plugin
						key={ slug }
						plugin={ plugins[ slug ] }
					/>
				);
			} ) }

		</ul>
	)
}

export default Plugins;
