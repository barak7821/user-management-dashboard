import { Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<p className='flex justify-center items-center min-h-screen font-bold text-3xl'>This route does not exist</p>} />
    </Routes>
  )
}

export default App
