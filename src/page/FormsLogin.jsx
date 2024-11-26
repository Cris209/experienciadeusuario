import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/styles.css";

function FormsLogin() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth){
      // Si el usuario ya está autenticado, redirígelo a MainPage
      navigate("/MainPage");
    }
  }, [auth, navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.login(email, password);
      navigate("/MainPage"); // Redirige al Dashboard
    } catch (error) {
      console.error("Login error: ", error.message);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      await auth.loginWithGoogle();
      navigate("/MainPage");
    } catch (error) {
      console.error("Google login error: ", error.message);
    }
  };

  return (
    <div className="App">
      <h1 className="titulouniversal">Go?</h1>
      <form className="form" onSubmit={handleLogin}>
        <h3 className="title">Login</h3>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
          placeholder="Password"
        />
        <div className="botones">
        <button type="submit" className="button">Login</button>
        <button onClick={handleGoogle} className="button">Login with Google</button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default FormsLogin;