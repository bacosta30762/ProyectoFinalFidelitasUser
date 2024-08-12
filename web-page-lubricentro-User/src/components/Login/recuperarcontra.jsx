import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Estilos/recuperar.css";

const RecoverPassword = () => {
  const navigate = useNavigate();

  const handleRecoverPassword = (e) => {
    e.preventDefault();
    
    alert('Correo de recuperación enviado (simulación).');
    navigate('/Login'); 
  };

  return (
    <div className="recover-password-container">
      <h1 className="recover-password-title">Recuperar Contraseña</h1>
      <form className="recover-password-form" onSubmit={handleRecoverPassword}>
        <input type="email" placeholder="Correo Electrónico" className="recover-password-input" required />
        <button type="submit" className="recover-password-button">Enviar</button>
      </form>
    </div>
  );
};

export default RecoverPassword;
