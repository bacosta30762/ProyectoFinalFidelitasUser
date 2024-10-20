import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Estilos/recuperar.css";

const RestablecerPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRestablecerPassword = async (e) => {
    e.preventDefault();

    const restablecerPasswordDto = {
      correo: email,
      token: token,
      nuevaPassword: newPassword
    };

    try {
      const response = await fetch('https://localhost:7180/api/Usuarios/restablecer-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(restablecerPasswordDto)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.errors || "Error al restablecer la contraseña.");
      } else {
        setSuccess("Contraseña restablecida correctamente. Redirigiendo a iniciar sesión...");
        setTimeout(() => {
          navigate('/Login');
        }, 3000); // Redirige después de 3 segundos
      }
    } catch (error) {
      setError("Error en la conexión.");
    }
  };

  return (
    <div className="recover-password-container">
      <h1 className="recover-password-title">Restablecer Contraseña</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form className="recover-password-form" onSubmit={handleRestablecerPassword}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="recover-password-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Token de Recuperación"
          className="recover-password-input"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nueva Contraseña"
          className="recover-password-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="recover-password-button">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default RestablecerPassword;
