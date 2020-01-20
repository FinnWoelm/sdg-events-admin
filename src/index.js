import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import netlifyIdentity from 'netlify-identity-widget';

window.netlifyIdentity = netlifyIdentity;
// You must run this once before trying to interact with the widget
netlifyIdentity.init();
// This is only necessary in development mode
if(process.env.NODE_ENV === 'development') {
  netlifyIdentity.store.setSiteURL("https://admin.sdg-events.de");
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
