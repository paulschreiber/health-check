import React from 'react';

function Notice( { notice } ) {
	return (
		<>
			<div
				className={ "notice inline notice-" + notice.severity }
				>
				<p>
					{ notice.message }
				</p>
			</div>
		</>
	)
}

export default Notice;
