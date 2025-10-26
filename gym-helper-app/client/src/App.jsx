import "./App.css";
import Navbar from "./components/navbar.jsx";
import ModeToggle from "./components/mode-toggle.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ModeToggle />
      <Outlet />
      <Navbar />
    </>
  );
}

export default App;
