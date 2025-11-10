// import { useState } from 'react'
import './App.css';
import Navbar from './components/navbar.jsx';
import ModeToggle from './components/mode-toggle.jsx';
// import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import AuthGate from './components/AuthGate.jsx';
import { Routes, Route, Outlet } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import Home from './pages/Home/Home.jsx';
import History from './pages/History/History.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Workout from './pages/Workout/Workout.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

// NOTE: App.jsx should be the layout for VALID users, it should not handle authentication

function AppLayout() {
  return (
    <>
    <ModeToggle />
    <Navbar />
    <Outlet />
    </>
  );
}

function App() {
  // const [isAuth, setIsAuth] = useState(false);
  // return isAuth ? (
  //   <>
  //     <ModeToggle />
  //     <Navbar />
  //     {/*<Outlet context={{ isAuth, setIsAuth }}/>*/}

  //   </>
  // ) : (
  //   <LoginPage homePage={() => setIsAuth(true)} />
  // )

  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

    {/* Private route */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      {/* These routes render inside the AppLayout's outlet */}
      <Route index element={<Home />} />
      <Route path="history" element={<History />} />
      <Route path="profile" element={<Profile />} />
      <Route path="workout" element={<Workout />} />
      <Route path="auth" element={<AuthGate />} />
    </Route>

      {/* ERROR ROUTE */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default App;
