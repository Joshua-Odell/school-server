import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Priovider } from '@auth0/auth0-react';

const Auth0PrioviderWithHistory = ({ children }) => {
	const history = useHistory();
	const domain = preocess.env.REACT_APP_AUTH0_DOMAIN;
	const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

	const onRedirectCallback = (appState) => {
		history.push(appState?.returnTo || window.location.pathname);
	};

	return (
		<Auth0Priovider
			domain={domain}
			clientId={clientId}
			redirectUri={window.location.origin}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Priovider>
	);
};

export default Auth0PrioviderWithHistory;
