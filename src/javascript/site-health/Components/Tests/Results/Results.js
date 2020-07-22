import React from 'react';
import Accordion from "../../../../Components/Accordion";
import AccordionSection from "../../../../Components/Accordion/AccordionSection";

function Results( { title, tests } ) {
	return (
		<>
			<h2>{ title }</h2>

			<Accordion>
				{ Object.keys( tests ).map( ( test ) => (
					<AccordionSection
						id={ test.test }
						isExpanded={ false }
						badge={ test.badge }
						label={ test.label }
						>
						{ test.description }
					</AccordionSection>
				) ) }
			</Accordion>
		</>
	);
}

export default Results;
