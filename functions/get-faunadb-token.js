/*
REQUIRED SETUP:
1. Create a FaunaDB collection: 'AccessTokens'
2. Create a unique index "token_by_email" with data.email terms
3. Create a role called "adminUser"
4. Grant "adminUser" role read, write, create, and delete permissions on the
   Events collection
5. Generate an API token for admin user under the adminUser role:
  1. Finn (admin interface)
  2. Nina (admin interface)
  3. ...
3. Create a record for each user with their access tokens in the AccessTokens
   collection:
{
  "email": "finn@email.com",
  "token": "generated-token-for-finn"
}
*/


/* Import faunaDB sdk */
const faunadb = require('faunadb')

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  const { user } = context.clientContext;

  if (!user) {
    return {
      statusCode: 401,
      body: "You must be signed in to call this function"
    };
  }

  // the search key
  const userToGetTokenFor = user.email

  try {
    // get token from database
    const { data } = await client.query(
      q.Get(q.Match(q.Index('key_by_email'), userToGetTokenFor))
    )

    const { token } = data

    return {
      statusCode: 200,
      body: JSON.stringify({ token: token })
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    console.log(err)

    return { statusCode: 500, body: err.toString() }
  }
}
