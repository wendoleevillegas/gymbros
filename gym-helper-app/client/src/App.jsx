import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar.jsx'
import ModeToggle from './components/mode-toggle.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import AuthGate from './components/AuthGate'
import { Outlet } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx'
import { AuthProvider } from './contexts/Auth-Context.jsx'
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return isAuth ? (
    <>
    <AuthProvider>
      <ModeToggle />
      <Navbar />
      {/*<Outlet context={{ isAuth, setIsAuth }}/>*/}
    </AuthProvider>
    </>
  ) : (
    <LoginPage homePage={() => setIsAuth(true)} />
  )

}

export default App;
