import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calculator from './components/Calculator';
import Orbs from './components/Orbs';
import './styles.css'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/Orbs" element={<Orbs />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
