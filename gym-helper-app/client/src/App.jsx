import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar.jsx'
import ModeToggle from './components/mode-toggle.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import AuthGate from './components/AuthGate'
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <>
     <Router>
      <Navbar />
      <ModeToggle/>
      <Routes>
        <Route path="/" element={<AuthGate isAuth={isAuth} setIsAuth={setIsAuth} />
          }/>
        <Route 
          path="/Protected" //test route.
            element=
            {<ProtectedRoute isAuth={isAuth}>
             <div className ='bg-white dark:bg-black text-black dark:text-white'>Protected Components go here</div>
             </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App
