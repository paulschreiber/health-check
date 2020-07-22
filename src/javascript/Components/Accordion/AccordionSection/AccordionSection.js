import React from 'react';

function AccordionSection( { id, label, isExpanded = false, badge = null, children } ) {
	return (
		<>
			<dt
				role="heading"
				aria-level="3"
			>
				<button
					aria-expanded={ isExpanded ? "true" : "false" }
					className="health-check-accordion-trigger"
					aria-controls={ "health-check-accordion-block-" + id }
					id={ "health-check-accordion-heading-" + id }
					type="button"
					>
					<span
						className="title">
						{ label }
					</span>

					{ null !== badge &&
						<>
							<span className={ "badge " + badge.color }>
								{ badge.label }
							</span>
						</>
					}

					<span className="icon"/>
				</button>
			</dt>

			<dd
				id={ "health-check-accordion-block-" + id }
				role="region"
				aria-labelledby={ "health-check-accordion-heading-" + id }
				className="health-check-accordion-panel"
				hidden={ ! isExpanded }
			>
				{ children }
			</dd>
		</>
	)
}

export default AccordionSection;
