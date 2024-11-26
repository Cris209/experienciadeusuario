import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import FormsLogin from "./page/FormsLogin.jsx";
import FormsRegister from "./page/FormsRegister";
import MainPage from "./page/MainPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./styles/styles.css";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/MainPage" /> : children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<PublicRoute><FormsLogin /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><FormsRegister /></PublicRoute>} />
          <Route
            path="/MainPage"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
