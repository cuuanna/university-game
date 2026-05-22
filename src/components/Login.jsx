import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function handleLogin() {
    const savedUsername = localStorage.getItem('username')
    const savedPassword = localStorage.getItem('password')

    if (username === savedUsername && password === savedPassword) {
      navigate('/game')
    } else {
      setError('Fel användarnamn eller lösenord')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Logga in</h1>
        <p className="auth-subtitle">Logga in för att spela</p>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Lösenord"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label className="show-password">
          <input
            type="checkbox"
            onChange={e => setShowPassword(e.target.checked)}
          />
          Visa lösenord
        </label>
        <button onClick={handleLogin}>Logga in</button>
        <p className="switch">Inget konto? <span onClick={() => navigate('/register')}>Registrera dig</span></p>
      </div>
    </div>
  )
}

export default Login