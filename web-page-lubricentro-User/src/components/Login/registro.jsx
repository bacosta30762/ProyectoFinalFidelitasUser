import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Estilos/registro.css";

const Registro = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const registroDto = {
      correo,
      contraseña,
      nombre,
      apellidos,
      cedula,
    };

    try {
      const response = await fetch("https://localhost:7180/api/Usuarios/Registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registroDto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.errors || "Error al registrar.");
      } else {
        alert("Registro exitoso. Ahora puede iniciar sesión.");
        navigate("/Login");
      }
    } catch (error) {
      setError("Error en la conexión.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro</h2>
      {error && <div className="error-message">{typeof error === "string" ? <p>{error}</p> : error.map((msg, index) => <p key={index}>{msg}</p>)}</div>}
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          className="register-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellidos"
          className="register-input"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          className="register-input"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="register-input"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cédula"
          className="register-input"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
        />
        <button type="submit" className="register-button">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Registro;

