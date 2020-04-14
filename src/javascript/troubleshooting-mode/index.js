import React from 'react';
import ReactDOM from 'react-dom';
import TroubleshootingMode from "./TroubleshootingMode";

{ document.getElementById( 'health-check-dashboard-widget' ) &&
	ReactDOM.render(
		<TroubleshootingMode />,
		document.getElementById( 'health-check-dashboard-widget' )
	);
}
