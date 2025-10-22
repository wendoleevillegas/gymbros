import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar.jsx'
import ModeToggle from './components/mode-toggle.jsx'

function App() {

  return (
    <>
      <ModeToggle/>
      <Navbar />
    </>
  )
}

export default App
