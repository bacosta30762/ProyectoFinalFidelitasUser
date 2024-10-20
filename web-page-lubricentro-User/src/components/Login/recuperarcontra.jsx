import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Estilos/recuperar.css";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    const recuperarPasswordDto = {
      correo: email
    };

    try {
      const response = await fetch('https://localhost:7180/api/Usuarios/RecuperarContraseña', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recuperarPasswordDto)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.errors || "Hubo un problema al enviar el correo.");
      } else {
        setSuccess("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
        setTimeout(() => {
          navigate('/restablecer-password');
        }, 3000); // Redirige después de 3 segundos
      }
    } catch (error) {
      setError("Error en la conexión.");
    }
  };

  return (
    <div className="recover-password-container">
      <h1 className="recover-password-title">Recuperar Contraseña</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form className="recover-password-form" onSubmit={handleRecoverPassword}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="recover-password-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="recover-password-button">Enviar</button>
      </form>
    </div>
  );
};

export default RecoverPassword;
