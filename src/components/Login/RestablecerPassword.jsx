import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form} from 'formik';
import { resetPasswordSchema } from '../Validaciones/recoverPasswordValidation'; 
import ValidatedInput from '../Validaciones/inputValidation';

import "../Estilos/recuperar.css";

const RestablecerPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRestablecerPassword = async (values, { setSubmitting }) => {
    const restablecerPasswordDto = {
      correo: values.email,
      token: values.token,
      nuevaPassword: values.newPassword,
    };

    try {
      const response = await fetch('https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/Usuarios/restablecer-password', {
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
        }, 3000);
      }
    } catch (error) {
      setError("Error en la conexión.");
    }
    setSubmitting(false);
  };

  return (
    <div className="recover-password-container">
      <h1 className="recover-password-title">Restablecer Contraseña</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <Formik
        initialValues={{ email: '', token: '', newPassword: '' }}
        validationSchema={resetPasswordSchema}
        onSubmit={handleRestablecerPassword}
      >
        {({ isSubmitting }) => (
          <Form className="recover-password-form">
            <ValidatedInput
              name="email"
              type="email"
              placeholder="Correo Electrónico"
              className="recover-password-input"
            />
            <ValidatedInput
              name="token"
              type="text"
              placeholder="Token de Recuperación"
              className="recover-password-input"
            />
            <ValidatedInput
              name="newPassword"
              type="password"
              placeholder="Nueva Contraseña"
              className="recover-password-input"
            />
            <button type="submit" className="recover-password-button" disabled={isSubmitting}>
              Restablecer Contraseña
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RestablecerPassword;

