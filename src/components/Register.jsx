import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function handleRegister() {
    if (username.length < 3) {
      setError('Användarnamnet måste vara minst 3 tecken')
      return
    }
    if (password.length < 8) {
      setError('Lösenordet måste vara minst 8 tecken')
      return
    }
    if (!/[0-9]/.test(password)) {
      setError('Lösenordet måste innehålla minst en siffra')
      return
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setError('Lösenordet måste innehålla minst ett specialtecken (!@#$%^&*)')
      return
    }

    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Skapa konto</h1>
        <p className="auth-subtitle">Registrera dig för att spela</p>
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
        <ul className="requirements">
          <li>Minst 3 tecken i användarnamnet</li>
          <li>Minst 8 tecken i lösenordet</li>
          <li>Minst en siffra</li>
          <li>Minst ett specialtecken (!@#$%^&*)</li>
        </ul>
        <button onClick={handleRegister}>Registrera</button>
        <p className="switch">Har du redan ett konto? <span onClick={() => navigate('/')}>Logga in</span></p>
      </div>
    </div>
  )
}

export default Register