import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'

const PublicRoute = (props) => {
  const user = false //netlifyIdentity.currentUser();

  return user ? <Redirect to="/" /> : <Route {...props} />;
};

const PrivateRoute = (props) => {
  const user = false // netlifyIdentity.currentUser();

  return user ? <Route {...props} /> : <Redirect to={`/login${window.location.hash}`} />;
};

function App() {
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
