 // import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Valuation from './pages/Valuation/Valuation';
import  Header  from './components/Header/Header';
import ApiTest from './components/ApiTest';
import ApiTestDashboard from './components/ApiTestDashboard';
// import { Footer } from './components/Footer';
import "./styles/global.scss";


function App() {


  return (
    <Router>

   <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/valutazione" element={<Valuation />}/>
          <Route path="/test-api" element={<ApiTest />}/>
          <Route path="/dashboard-api" element={<ApiTestDashboard />}/>
        </Routes>


    </Router>
  )
}

export default App