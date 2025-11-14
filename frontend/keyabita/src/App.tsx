// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Valuation from './pages/Valuation/Valuation';


// import { Footer } from './components/Footer';
import "./styles/global.scss";


function App() {


  return (
    <Router>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/valutazione" element={<Valuation />}/>
        </Routes>


    </Router>
  )
}

export default App