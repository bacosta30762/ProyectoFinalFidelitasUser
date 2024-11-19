import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { recoverPasswordSchema } from '../Validaciones/recoverPasswordValidation'; 
import ValidatedInput from "../Validaciones/inputValidation";
import "../Estilos/recuperar.css";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRecoverPassword = async (values, { setSubmitting }) => {
    const recuperarPasswordDto = { correo: values.email };

    try {
      const response = await fetch('https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Usuarios/RecuperarContraseña', {
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
        }, 3000);
      }
    } catch (error) {
      setError("Error en la conexión.");
    }
    setSubmitting(false);
  };

  return (
    <div className="recover-password-container">
      <h1 className="recover-password-title">Recuperar Contraseña</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <Formik
        initialValues={{ email: '' }}
        validationSchema={recoverPasswordSchema}
        onSubmit={handleRecoverPassword}
      >
        {({ isSubmitting }) => (
          <Form className="recover-password-form">
            <ValidatedInput
              name="email"
              type="email"
              placeholder="Correo Electrónico"
              className="recover-password-input"
            />
            <button type="submit" className="recover-password-button" disabled={isSubmitting}>
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RecoverPassword;
