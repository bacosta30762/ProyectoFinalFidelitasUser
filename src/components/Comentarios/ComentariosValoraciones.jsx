import React, { useState, useEffect } from "react";
import { FaStar, FaEdit, FaTrashAlt } from "react-icons/fa";
import { getToken } from "../Servicios/tokenService";
import { jwtDecode } from "jwt-decode"; // Nota: jwtDecode no lleva {} al import.
import "bootstrap/dist/css/bootstrap.min.css";
import "./ComentariosValoraciones.css";

const ComentariosValoraciones = () => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [nuevaValoracion, setNuevaValoracion] = useState(0);
  const [comentarioEditado, setComentarioEditado] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      const usuarioId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      setUsuarioId(usuarioId); // Asumiendo que "nameidentifier" es el ID del usuario
      console.log("Usuario ID desde el token:", usuarioId);
      cargarComentarios(usuarioId);
    }
  }, []);

  // Función para cargar comentarios del backend
  const cargarComentarios = async (userId) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/Comentarios/obtenercomentariosusuario/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComentarios(data);
        console.log("Comentarios obtenidos:", data);
      } else {
        console.error("Error al cargar comentarios");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  // Función para agregar o editar un comentario
  const agregarComentario = async () => {
    const token = getToken();
    const url = comentarioEditado
      ? `${process.env.REACT_APP_API_URL}/api/Comentarios/editar/${comentarioEditado.id}`
      : `${process.env.REACT_APP_API_URL}/api/Comentarios/crear`;

    const metodo = comentarioEditado ? "PUT" : "POST";

    try {
      const body = {
        texto: nuevoComentario.trim(),
        puntuacion: nuevaValoracion,
      };

      if (!body.texto || body.puntuacion === 0) {
        alert("El comentario y la valoración son obligatorios.");
        return;
      }

      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        cargarComentarios(usuarioId);
        setNuevoComentario("");
        setNuevaValoracion(0);
        setComentarioEditado(null);
      } else {
        console.error("Error al guardar el comentario");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  // Función para eliminar un comentario
  const eliminarComentario = async (id) => {
    const token = getToken();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/Comentarios/eliminar/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        cargarComentarios(usuarioId);
      } else {
        console.error("Error al eliminar el comentario");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  const editarComentario = (comentario) => {
    setNuevoComentario(comentario.texto);
    setNuevaValoracion(comentario.puntuacion); // Usar puntuación existente del comentario
    setComentarioEditado(comentario);
  };

  const handleStarClick = (index) => {
    setNuevaValoracion(index + 1);
  };

  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    // Convertir la fecha a formato ISO válido en JavaScript
    const fechaObjeto = new Date(fecha);
    // Verificar si la fecha es válida antes de formatearla
    if (isNaN(fechaObjeto)) {
      return "Fecha inválida";
    }
    return fechaObjeto.toLocaleDateString();
  };

  return (
    <div className="comentarios-container">
      <h1>Comentarios y Valoraciones</h1>
      <div className="comentario-form">
        <textarea
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          placeholder="Escribe tu comentario"
        />
        <div className="valoracion-container">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              className={`star ${index < nuevaValoracion ? "filled" : ""}`}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
        <button onClick={agregarComentario}>
          {comentarioEditado ? "Guardar Cambios" : "Agregar Comentario"}
        </button>
      </div>
      <div className="comentarios-lista">
        {comentarios.length === 0 ? (
          <p>No hay comentarios disponibles.</p> // <--- Mensaje cuando no hay comentarios
        ) : (
          comentarios.map((comentario) => (
            <div key={comentario.id} className="comentario">
              <div className="comentario-header">
                <FaTrashAlt
                  className="eliminar-icon"
                  onClick={() => eliminarComentario(comentario.id)}
                />
                <FaEdit
                  className="editar-icon"
                  onClick={() => editarComentario(comentario)}
                />
              </div>
              <p>{comentario.texto}</p>
              <div className="valoracion-container">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={`star ${
                      index < comentario.puntuacion ? "filled" : ""
                    }`}
                  />
                ))}
              </div>
              <p>Fecha: {formatearFecha(comentario.fechaCreacion)}</p>{" "}
              {/* Mostrando fecha */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComentariosValoraciones;

