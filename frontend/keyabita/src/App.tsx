// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import "./styles/global.scss";


function App() {
  

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
