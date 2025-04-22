// Send's email and password to backend database for user authentication
export const login = async (email, password) => {
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  })

  if (response.status === 400) {
    console.log('Invalid credentials. Please try again.')
  }

  const data = await response.json()
  return data
}

// Sends user type, email, password and name to backend database for user creation
export const register = async (type, email, password, firstName) => {
  const response = await fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type, email, password, firstName })
  })

  const data = await response.json()
  return data
}

// Fetches user ID from backend database for assigning clients to practitioners
export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(`http://localhost:8080/auth/getUserByEmail?email=${email}`)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('User not found', data.message)
    }
  } catch (err) {
    console.error('Error fetching user ID', err)
  }
}
