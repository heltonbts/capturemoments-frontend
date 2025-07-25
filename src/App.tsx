import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Home/Home'

function App() {
  const Root = () => {
    const isAuthenticate = !!localStorage.getItem('cm:token')

    return isAuthenticate ? <Navigate to="/home" /> : <Navigate to="/login" />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
