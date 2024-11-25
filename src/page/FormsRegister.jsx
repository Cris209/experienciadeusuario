import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/styles.css";

function RegisterForm() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Estado para el mensaje de error

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar contraseña antes de registrarse
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;  // No deja proceder si la contraseña es corta
    }

    try {
      await auth.register(email, password);
    } catch (error) {
      console.error("Registration error: ", error.message);
      setError("Hubo un error al registrarse. Intenta de nuevo.");
    }
  };

  return (
    <div className="App">
      <h1 className="titulouniversal">Registro</h1>
      <form className="form" onSubmit={handleRegister}>
        <h3 className="title">Crea tu cuenta</h3>
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
          placeholder="Contraseña"
        />
        
        {/* Mostrar el error si la contraseña no es válida */}
        {error && <p className="error">{error}</p>}

        <div className="botones">
          <button type="submit" className="button">Registrar</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
