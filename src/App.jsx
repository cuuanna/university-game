import { Routes, Route } from 'react-router-dom'
import './App.css'
import MiniGame from './components/MiniGame'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<MiniGame />} />
      </Routes>
    </div>
  )
}

export default App