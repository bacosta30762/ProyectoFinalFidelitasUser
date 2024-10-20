import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Estilos/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginDto = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://localhost:7180/api/Usuarios/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginDto),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.errors || "Datos incorrectos.");
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Guardar el token en localStorage
        navigate("/"); // Redirigir a la página principal o a la deseada
      }
    } catch (error) {
      setError("Error en la conexión.");
    }
  };
  
  const handleRegister = () => {
    navigate("/Registro");
  };

  const handleRecoverPassword = () => {
    navigate("/RecuperarContra");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && (
        <div className="error-message">
          {typeof error === "string" ? (
            <p>{error}</p>
          ) : (
            error.map((msg, index) => <p key={index}>{msg}</p>)
          )}
        </div>
      )}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Captura de correo
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Captura de contraseña
        />
        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>
      <div className="login-options">
        <button
          className="forgot-password-link"
          onClick={handleRecoverPassword}
        >
          Recuperar contraseña
        </button>
        <button className="register-button" onClick={handleRegister}>
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Login;
