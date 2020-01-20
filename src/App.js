import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'

const PublicRoute = (props) => {
  const user = netlifyIdentity.currentUser();

  return user ? <Redirect to="/" /> : <Route {...props} />;
};

const PrivateRoute = (props) => {
  const user = netlifyIdentity.currentUser();

  return user ? <Route {...props} /> : <Redirect to={`/login${window.location.hash}`} />;
};

function App() {
  // Force update upon login
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  netlifyIdentity.on('login', user => forceUpdate());

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          exact path="/"
          component={AdminPage}>
        </PrivateRoute>
        <PublicRoute
          path="/login"
          component={LoginPage}>
          </PublicRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
