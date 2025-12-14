import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    
    if (!username) {
      return setError('Please enter a username')
    }
    
    if (!password) {
      return setError('Please enter a password')
    }
    
    // Demo login - accept any non-empty username/password
    // In production, this would call an API
    navigate('/home')
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleLogin} aria-label="Login form">
        <h1 className="logo">MyApp Admin</h1>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn">Login</button>

        <p className="note" style={{marginTop:12}}>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </main>
  )
}
