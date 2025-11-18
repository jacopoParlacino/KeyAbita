import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./router/ProtectedRoute";
import Home from "./pages/Home/Home";
import Valuation from "./pages/Valuation/Valuation";
import "./styles/global.scss";
import Login from "./pages/Login/Login";
import Admin from "./pages/BackOffice/Admin";
import Dashboard from "./pages/BackOffice/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/amministrazione"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/valutazione" element={<Valuation />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
