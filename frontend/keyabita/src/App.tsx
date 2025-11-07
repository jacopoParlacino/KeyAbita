// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Valuation from './pages/Valuation/Valuation';
import FormSuccess from './pages/FormSuccess/FormSucces';

// import { Footer } from './components/Footer';
import "./styles/global.scss";


function App() {


  return (
    <Router>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/valutazione" element={<Valuation />}/>
          <Route path="/form-success" element={<FormSuccess />}/>
        </Routes>


    </Router>
  )
}

export default App