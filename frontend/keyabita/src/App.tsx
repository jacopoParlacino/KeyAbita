<<<<<<< HEAD
 // import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Valuation from './pages/Valuation/Valuation';
<<<<<<< HEAD
import  Header  from './components/Header/Header';
import ApiTest from './components/ApiTest';
import ApiTestDashboard from './components/ApiTestDashboard';
=======


>>>>>>> dev/frontend-form
// import { Footer } from './components/Footer';
import "./styles/global.scss";
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import ProtectedRoute from './router/ProtectedRoute';
import Home from './pages/Home/Home';
import Valuation from './pages/Valuation/Valuation';
import "./styles/global.scss";
import Login from './pages/Login/Login';
import Admin from './pages/BackOffice/Admin';
>>>>>>> origin/frontend/mobile_homepage


function App() {


  return (
<<<<<<< HEAD
    <Router>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/valutazione" element={<Valuation />}/>
          <Route path="/test-api" element={<ApiTest />}/>
          <Route path="/dashboard-api" element={<ApiTestDashboard />}/>
=======
    <AuthProvider>
    <Router>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route
          path="/amministrazione"
          element={<ProtectedRoute role="admin">
<Admin />
</ProtectedRoute>
            }
            />
          <Route path="/valutazione" element={<Valuation />}/>
>>>>>>> origin/frontend/mobile_homepage
        </Routes>


    </Router>
<<<<<<< HEAD
=======
    </AuthProvider>
>>>>>>> origin/frontend/mobile_homepage
  )
}

export default App