import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { modificarUsuarioValidationSchema } from "../Validaciones/modificarUsuarioValidation";
import { getToken } from "../Servicios/tokenService"; 
import { jwtDecode } from "jwt-decode";
import "./perfileditar.css"; 

const Perfileditar = () => {
  const navigate = useNavigate(); 
  const [userData, setUserData] = useState({
    nombre: '',
    cedula: '',
    correo: '',
    apellidos: '', 
  });
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        if (!token) {
          console.error("Token no encontrado");
          return;
        }

        const decodedToken = jwtDecode(token);
        const cedula = decodedToken.Cedula;

        const response = await fetch(
          `https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Usuarios/ObtenerUsuario/${cedula}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const usuario = data.valor;
          setUserData({
            nombre: usuario.nombre,
            cedula: usuario.cedula,
            correo: usuario.email,
            apellidos: usuario.apellidos || '', 
          });
        } else {
          console.error("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchUserData();
  }, []);

  const formik = useFormik({
    initialValues: {
      nombre: userData.nombre,
      cedula: userData.cedula,
      correo: userData.correo,
      apellidos: userData.apellidos, 
    },
    validationSchema: modificarUsuarioValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = getToken();
        const decodedToken = jwtDecode(token);
        const cedula = decodedToken.Cedula;

        const response = await fetch(
          `https://apirymlubricentro-dddjebcxhyf6hse7.centralus-01.azurewebsites.net/api/Usuarios/Actualizar/${cedula}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              Cedula: values.cedula,
              Nombre: values.nombre,
              Apellidos: values.apellidos, 
              Correo: values.correo,
            }),
          }
        );

        if (response.ok) {
          setShowPopup(true); // Muestra el popup cuando la actualización es exitosa
          setTimeout(() => {
            setShowPopup(false);
            navigate("/Perfil");
          }, 2000); // Oculta el popup después de 2 segundos
        } else {
          console.error("Error al actualizar los datos del usuario");
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
      }
    },
  });

  return (
    <div className="edit-user-container">
      <h2 className="edit-user-title">Editar Usuario</h2>
      <form className="edit-user-form" onSubmit={formik.handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="edit-user-input"
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <div className="error">{formik.errors.nombre}</div>
          )}
        </label>
        <label>
          Cédula:
          <input
            type="text"
            name="cedula"
            value={formik.values.cedula}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="edit-user-input"
            disabled 
          />
          {formik.touched.cedula && formik.errors.cedula && (
            <div className="error">{formik.errors.cedula}</div>
          )}
        </label>
        <label>
          Apellidos:
          <input
            type="text"
            name="apellidos"
            value={formik.values.apellidos}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="edit-user-input"
          />
          {formik.touched.apellidos && formik.errors.apellidos && (
            <div className="error">{formik.errors.apellidos}</div>
          )}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="correo"
            value={formik.values.correo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="edit-user-input"
          />
          {formik.touched.correo && formik.errors.correo && (
            <div className="error">{formik.errors.correo}</div>
          )}
        </label>
        <button type="submit" className="save-button">
          Guardar Cambios
        </button>
      </form>

      {/* Popup de confirmación */}
      {showPopup && (
        <div className="popup">
          <p>Su información ha sido actualizada</p>
        </div>
      )}
    </div>
  );
};

export default Perfileditar;
