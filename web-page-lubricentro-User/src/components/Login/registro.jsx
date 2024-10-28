import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Estilos/registro.css";
import { registroValidationSchema } from "../Validaciones/registroValidation";
import ValidatedInput from "../Validaciones/inputValidation";


const Registro = () => {
  const navigate = useNavigate();
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    const registroDto = {
      correo: values.correo,
      contraseña: values.contraseña,
      nombre: values.nombre,
      apellidos: values.apellidos,
      cedula: values.cedula,
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
        setErrors({ server: errorData.errors || "Error al registrar." });
      } else {
        const successData = await response.json();
        setSuccessMessage(successData.message || "Registro exitoso. Ahora puede iniciar sesión.");
        setSuccessModalVisible(true);
      }
    } catch (error) {
      setErrors({ server: "Error en la conexión." });
    } finally {
      setSubmitting(false);
    }
  };

  const closeModalAndRedirect = () => {
    setSuccessModalVisible(false);
    navigate("/Login");
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro</h2>
      <Formik
        initialValues={{
          nombre: "",
          apellidos: "",
          correo: "",
          contraseña: "",
          cedula: "",
        }}
        validationSchema={registroValidationSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting, errors }) => (
          <Form className="register-form">
            {errors.server && <div className="error-message">{errors.server}</div>}

            <ValidatedInput
              name="nombre"
              type="text"
              placeholder="Nombre"
              className="register-input"
            />

            <ValidatedInput
              name="apellidos"
              type="text"
              placeholder="Apellidos"
              className="register-input"
            />

            <ValidatedInput
              name="correo"
              type="email"
              placeholder="Correo"
              className="register-input"
            />

            <ValidatedInput
              name="contraseña"
              type="password"
              placeholder="Contraseña"
              className="register-input"
            />

            <ValidatedInput
              name="cedula"
              type="text"
              placeholder="Cédula"
              className="register-input"
            />

            <button type="submit" className="register-button" disabled={isSubmitting}>
              Registrar
            </button>
          </Form>
        )}
      </Formik>

      {isSuccessModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Registro exitoso</h4>
            <p>{successMessage}</p>
            <button className="modal-button" onClick={closeModalAndRedirect}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registro;