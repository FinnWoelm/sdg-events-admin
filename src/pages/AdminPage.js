import React, { useState, useEffect } from 'react'
import { GET } from '../helpers/netlifyApi'

function AdminPage() {
  const [databaseToken, setDatabaseToken] = useState(null)

  useEffect(() => {
    const fetchToken = async () => {
      const { token } = await GET(`/get-faunadb-token`)
      setDatabaseToken(token);
    }

    fetchToken()
  }, []);

  return (
    <div>
      <h1>
        Admin Page
      </h1>
      <p>
        DB Key: {databaseToken}
      </p>
    </div>
  )
}


export default AdminPage
