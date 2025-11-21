import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import ProtectedRoute from "./router/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Home from "./pages/Home/Home";
import Valuation from "./pages/Valuation/Valuation";
import "./styles/global.scss";
import Login from "./pages/Login/Login";
import Admin from "./pages/BackOffice/Admin";
import Dashboard from "./pages/BackOffice/Dashboard";

function App() {
  return (
    <ErrorBoundary>
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
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="agent">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
