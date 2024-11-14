import React, { useEffect, useState } from "react";
import { getToken } from "../Servicios/tokenService";
import "./OrdenList.css";

const OrdenList = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchOrdenes = async () => {
      const token = getToken();
      const response = await fetch("https://localhost:7180/api/Ordenes/listar-ordenes-usuario", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrdenes(data);
      } else {
        console.error("Error al cargar las órdenes");
      }
    };

    fetchOrdenes();
  }, []);

  const deleteOrder = async (id) => {
    const token = getToken();
    const response = await fetch(`https://localhost:7180/api/Ordenes/Eliminarorden${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setOrdenes(ordenes.filter((orden) => orden.numeroOrden !== id));
    } else {
      console.error("Error al eliminar la orden");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrdenes = ordenes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ordenes.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="orden-list-container">
      <h2>Listado de Órdenes</h2>
      <table className="orden-table">
        <thead>
          <tr>
            <th>Número de Orden</th>
            <th>Estado</th>
            <th>Placa del Vehículo</th>
            <th>Nombre del Mecánico</th>
            <th>Día</th>
            <th>Hora</th>
            <th>Servicio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentOrdenes.map((orden) => (
            <tr key={orden.numeroOrden}>
              <td>{orden.numeroOrden}</td>
              <td>{orden.estado}</td>
              <td>{orden.placaVehiculo}</td>
              <td>{orden.nombreMecanico}</td>
              <td>{orden.dia}</td>
              <td>{orden.hora}:00</td>
              <td>{orden.nombreServicio}</td>
              <td>
                <button
                  onClick={() => deleteOrder(orden.numeroOrden)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdenList;
