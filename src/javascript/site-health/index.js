import React from 'react';
import ReactDOM from 'react-dom';
import HealthCheck from './HealthCheck';

{ document.getElementById( 'site-health' ) &&
	ReactDOM.render(
		<HealthCheck />,
		document.getElementById( 'site-health' )
	);
}
