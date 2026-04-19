// src/App.tsx
import './App.css'
import Navbar from './components/Navbar'
import AuthPages from './components/AuthPages'
function App() {
  return (
    <>
      <Navbar activeLink="Home" />
      <AuthPages />
    </>
  )
}

export default App