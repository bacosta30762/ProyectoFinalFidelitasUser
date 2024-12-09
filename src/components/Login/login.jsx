import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Estilos/login.css";
import { loginValidationSchema } from "../Validaciones/loginValidation";
import { saveToken } from "../Servicios/tokenService";
import ValidatedInput from "../Validaciones/inputValidation";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    const loginDto = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Usuarios/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ email: errorData.errors || "Datos incorrectos" });
      } else {
        const data = await response.json();
        saveToken(data.token);
        navigate("/");
      }
    } catch (error) {
      setErrors({ email: "Error en la conexión." });
    } finally {
      setSubmitting(false);
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
      <h2 className="login-title">Ingresar al sistema</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <ValidatedInput
              name="email"
              type="email"
              placeholder="Correo"
              className="login-input"
            />
            <ValidatedInput
              name="password"
              type="password"
              placeholder="Contraseña"
              className="login-input"
            />
            <button type="submit" className="login-button" disabled={isSubmitting}>
              Iniciar Sesión
            </button>
          </Form>
        )}
      </Formik>

      <div className="login-options">
        <span className="forgot-password-link" onClick={handleRecoverPassword}>
          Recuperar contraseña
        </span>
        <button className="register-button" onClick={handleRegister}>
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Login;
