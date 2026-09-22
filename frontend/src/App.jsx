import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calculator from './components/Calculator';
import Orbs from './components/Orbs';
import TeamBuilder from './components/TeamBuilder';
import Glossary from './components/Glossary';
import './styles.css'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/Orbs" element={<Orbs />} />
        <Route path="/TeamBuilder" element={<TeamBuilder />} />
        <Route path="/Glossary" element={<Glossary />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
