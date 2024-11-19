import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { getToken } from "../Servicios/tokenService"; 
import { jwtDecode } from "jwt-decode"; 
import "./perfil.css";

const Profile = () => {
  const navigate = useNavigate(); 
  const [userData, setUserData] = useState({
    nombre: "",
    apellidos: "",
    cedula: "",
    correo: "", 
  });

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

        if (!cedula) {
          console.error("Cédula no encontrada en el token");
          return;
        }

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
            apellidos: usuario.apellidos, // Obtener apellidos
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

  const handleEdit = () => {
    const token = getToken();
    const decodedToken = jwtDecode(token); 
    const cedula = decodedToken.Cedula;
    navigate(`/perfileditar/${cedula}`);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Perfil de Usuario</h2>
      <div className="profile-info">
        <div className="profile-field">
          <label>Nombre:</label>
          <p>{userData.nombre}</p>
        </div>
        <div className="profile-field">
          <label>Apellidos:</label>
          <p>{userData.apellidos}</p> 
        </div>
        <div className="profile-field">
          <label>Cédula:</label>
          <p>{userData.cedula}</p>
        </div>
        <div className="profile-field">
          <label>Correo:</label>
          <p>{userData.correo}</p>
        </div>
      </div>
      <button className="edit-button" onClick={handleEdit}>Modificar</button>
    </div>
  );
};

export default Profile;


