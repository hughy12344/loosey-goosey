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