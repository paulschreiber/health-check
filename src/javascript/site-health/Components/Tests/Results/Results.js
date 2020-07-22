import React from 'react';
import Accordion from "../../../../Components/Accordion";
import AccordionSection from "../../../../Components/Accordion/AccordionSection";

function Results( { title, tests } ) {
	return (
		<>
			<h2>{ title }</h2>

			<Accordion>
				{ Object.keys( tests ).map( ( slug ) => (
					<AccordionSection
						key={ slug }
						id={ tests[ slug ].test }
						isExpanded={ false }
						badge={ tests[ slug ].badge ? tests[ slug ].badge : null }
						label={ tests[ slug ].label }
						>
						{ tests[ slug ].description }
					</AccordionSection>
				) ) }
			</Accordion>
		</>
	);
}

export default Results;
