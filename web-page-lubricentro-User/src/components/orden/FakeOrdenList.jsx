import React, { useState } from "react";

const FakeOrdenList = () => {
  // Nombre del cliente para el header (puedes cambiarlo dinámicamente según sea necesario)
  const clienteNombre = "Juan Pérez";

  // Datos fake para las órdenes con los campos actualizados
  const ordenes = [
    {
      id: 1,
      numeroOrden: "001",
      placaVehiculo: "XWZ729",
      servicio: "Cambio de aceite",
      monto: "₡18000",
      fecha: "2024-08-10",
      mecanico: "Luis Martínez",
    },
    {
      id: 2,
      numeroOrden: "002",
      placaVehiculo: "XWZ729",
      servicio: "Revisión de frenos",
      monto: "₡8000",
      fecha: "2024-08-09",
      mecanico: "Carlos Ruiz",
    },
    {
      id: 3,
      numeroOrden: "003",
      placaVehiculo: "XWZ729",
      servicio: "Alineación y balanceo",
      monto: "₡12000",
      fecha: "2024-08-08",
      mecanico: "Fernando Torres",
    },
    {
      id: 4,
      numeroOrden: "004",
      placaVehiculo: "XWZ729",
      servicio: "Cambio de batería",
      monto: "₡7000",
      fecha: "2024-08-07",
      mecanico: "Miguel Hernández",
    },
  ];

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Función para filtrar las órdenes según el término de búsqueda
  const filteredOrdenes = ordenes.filter(
    (orden) =>
      orden.numeroOrden.includes(searchTerm) ||
      orden.placaVehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.monto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.fecha.includes(searchTerm) ||
      orden.mecanico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Cliente: {clienteNombre}</h1>
      <h2>Lista de Órdenes</h2>
      <input
        type="text"
        placeholder="Buscar órdenes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "10px",
        }}
      >
        <div>
          <strong>Número de Orden</strong>
        </div>
        <div>
          <strong>Placa del Vehículo</strong>
        </div>
        <div>
          <strong>Servicio Prestado</strong>
        </div>
        <div>
          <strong>Monto</strong>
        </div>
        <div>
          <strong>Fecha</strong>
        </div>
        <div>
          <strong>Mecánico</strong>
        </div>

        {filteredOrdenes.length > 0 ? (
          filteredOrdenes.map((orden) => (
            <React.Fragment key={orden.id}>
              <div>{orden.numeroOrden}</div>
              <div>{orden.placaVehiculo}</div>
              <div>{orden.servicio}</div>
              <div>{orden.monto}</div>
              <div>{orden.fecha}</div>
              <div>{orden.mecanico}</div>
            </React.Fragment>
          ))
        ) : (
          <div style={{ gridColumn: "span 6", textAlign: "center" }}>
            No se encontraron órdenes.
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeOrdenList;
