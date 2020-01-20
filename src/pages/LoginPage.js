import React, { Fragment } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

function LoginPage() {
  const handleLogin = (e) => {
    // Prompt login with Google
    netlifyIdentity.store.externalLogin('google')
  }

  return (
    <Fragment>
      <h1>
        Login Page
      </h1>
      <button onClick={handleLogin}>
        Log in
      </button>
    </Fragment>
  )
}


export default LoginPage
