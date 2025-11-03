import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar.jsx'
import ModeToggle from './components/mode-toggle.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import AuthGate from './components/AuthGate'
import { Outlet } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx'
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <>
      <LoginPage/>
      <ModeToggle />
      <Navbar />
      <Outlet context={{ isAuth, setIsAuth }}/>

    </>
  );
}

export default App;
