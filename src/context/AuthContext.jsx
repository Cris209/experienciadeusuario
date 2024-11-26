import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/* Creating a context object. */
export const authContext = createContext();

/**
 * UseAuth() is a function that returns the context object that was created by the useContext() hook.
 */
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("error creating auth context");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  // Cambié de "" a null
  const [loading, setLoading] = useState(true);  // Añadí un estado de carga para manejar la sincronización

  /* Hook que se ejecuta cuando el componente se monta y cuando se actualiza */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Actualiza el estado del usuario
      setLoading(false);  // Desactiva la carga cuando se sincroniza el estado
    });

    return () => unsubscribe();  // Limpia el suscriptor cuando el componente se desmonta
  }, []);

  /**
   * "register" is a function that takes two arguments, "email" and "password", and then calls the
   * "createUserWithEmailAndPassword" function with the "auth" object and the "email" and "password"
   * arguments.
   */ 
 
  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.error("Error registering: ", error.message);
      // Verificamos si el error es de correo ya registrado
      if (error.code === "auth/email-already-in-use") {
        alert("Este correo ya está registrado. Intenta con otro.");
      } else {
        alert("Hubo un error al registrarse. Intenta de nuevo.");
      }
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.error("Error logging in: ", error.code);
      alert("Correo o contraseña incorrectos");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const responseGoogle = new GoogleAuthProvider();
      return await signInWithPopup(auth, responseGoogle);
    } catch (error) {
      console.error("Error with Google login: ", error.message);
    }
  };
  const logout = async () => {
    
    try {
      
      const response = await signOut(auth);
      window.location.href = "/login";
      console.log(response);
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  // Si está cargando, muestra algo mientras se verifica el estado de autenticación
  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <authContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
