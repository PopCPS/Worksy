import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './pages/home'
import './index.css'
import { Signin } from './pages/signin';
import { Signup } from './pages/signup';
import { Redirect } from './pages/redirect';
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Redirect />} />
          <Route path='/:agenda' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
)
