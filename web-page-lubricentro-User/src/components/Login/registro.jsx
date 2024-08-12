import React, { useState } from 'react'; // Asegúrate de importar useState
import { useNavigate } from 'react-router-dom';
import "../Estilos/registro.css";

const Register = () => {
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Simulación de verificación de cédula
    if (cedula === '118090026') {
      setError('Cédula ya ocupada');
    } else {
      setError('');
      // Aquí puedes agregar la lógica para registrar al usuario
      alert('Registro completado (simulación).');
      navigate('/Login'); // Redirige a la página de inicio de sesión después de registrar
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Registrar</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Nombre" 
          className="register-input" 
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
        <input 
          type="email" 
          placeholder="Correo Electrónico" 
          className="register-input" 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña Inicial" 
          className="register-input" 
          required 
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="register-button">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
