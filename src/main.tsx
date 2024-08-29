import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './pages/home'
import './index.css'
import { Signin } from './pages/signin';
import { Signup } from './pages/signup';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  </StrictMode>,
)
