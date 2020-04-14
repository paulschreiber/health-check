import React from 'react';
import Column from "./Modules/Column";
import Title from "./Modules/Title";
import Accordion from "./Modules/Accordion";
import AccordionSection from "./Modules/Accordion/AccordionSection";
import { __ } from "@wordpress/i18n";

import "./Stores/Plugins";
import "./Stores/Themes";
import "./Stores/Notices";

import Plugins from "./Modules/Plugins";

import { useSelect } from "@wordpress/data";
import Themes from "./Modules/Themes";
import Notices from "./Modules/Notices";

function TroubleshootingMode() {
	const plugins = useSelect( ( select ) => {
		return select( 'site-health-plugins' ).getPlugins();
	} );

	const themes = useSelect( ( select ) => {
		return select( 'site-health-themes' ).getThemes();
	} );

	const notices = useSelect( ( select ) => {
		return select( 'site-health-notices' ).getNotices();
	} );

	return (
		<>
			<Column
				extraClasses="welcome-panel-content"
			>
				<Title>
					{ __( 'Troubleshooting Mode', 'health-check' ) } - <span className="green">{ __( 'enabled', 'health-check' ) }</span>
				</Title>

				<a href="?health-check-disable-troubleshooting=1" className="button button-primary">
					{ __( 'Disable Troubleshooting Mode', 'health-check' ) }
				</a>

				<div
					className="about-description">
					<p
						dangerouslySetInnerHTML={{ __html: __( 'Your site is currently in Troubleshooting Mode. This has <strong>no effect on your site visitors</strong>, they will continue to view your site as usual, but for you it will look as if you had just installed WordPress for the first time.', 'health-check' ) }}
					/>

					<p
						dangerouslySetInnerHTML={{ __html: __( 'Here you can enable individual plugins or themes, helping you to find out what might be causing strange behaviors on your site. Do note that <strong>any changes you make to settings will be kept</strong> when you disable Troubleshooting Mode.', 'health-check' ) }}
					/>
				</div>
			</Column>

			<Column>
				<Accordion>
					<AccordionSection
						id="plugins"
						label={ "Available plugins (" + Object.keys( plugins ).length + ")" }
					>

						<Plugins/>

					</AccordionSection>
					<AccordionSection
						id="themes"
						label={ "Available Themes (" + Object.keys( themes ).length + ")" }
					>

						<Themes/>

					</AccordionSection>

					<AccordionSection
						id="notices"
						label={ "Notices (" + notices.length + ")" }
						isExpanded="true"
					>

						<Notices/>

					</AccordionSection>
				</Accordion>
			</Column>
		</>
	)
}

export default TroubleshootingMode;
