import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import FormsLogin from "./page/FormsLogin.jsx";
import FormsRegister from "./page/FormsRegister";
import MainPage from "./page/MainPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./styles/styles.css";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        
        <Routes>
          <Route path="/login" element={<FormsLogin />} />
          <Route path="/register" element={<FormsRegister />} />
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
