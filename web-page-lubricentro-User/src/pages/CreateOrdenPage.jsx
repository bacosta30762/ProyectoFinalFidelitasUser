import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const CreateOrdenPage = () => {
  const location = useLocation();
  const { selectedDate, hour } = location.state || {};
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [serviceProvided, setServiceProvided] = useState("");
  const [date, setDate] = useState(selectedDate ? selectedDate.toISOString().split('T')[0] : "");

  // Servicios por defecto
  const services = [
    { id: 1, name: "Cambio de aceite" },
    { id: 2, name: "Mecánica rápida" },
    { id: 3, name: "Revisión y cambio de llantas" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Obtener el ID del servicio basado en el nombre seleccionado
    const selectedService = services.find(service => service.name === serviceProvided);
    
    if (!selectedService) {
      alert("Seleccione un servicio válido.");
      return;
    }

    // Obtener el token 
    const token = localStorage.getItem("token");

    const dto = {
      ServicioId: selectedService.id,
      PlacaVehiculo: vehiclePlate,
      Hora: parseInt(hour.split(':')[0]), 
      Dia: new Date(date).toISOString().split('T')[0] 
    };

    try {
      const response = await fetch("https://localhost:7180/api/Ordenes/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.errors ? errorData.errors : "Error al crear la orden.");
      } else {
        alert("Orden creada con éxito.");
      }
    } catch (error) {
      alert("Error en la conexión.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Detalle de Orden de Servicio</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Placa del Vehículo:</label>
          <input
            type="text"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Servicio Prestado:</label>
          <select
            value={serviceProvided}
            onChange={(e) => setServiceProvided(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="">Seleccione un servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Fecha:</label>
          <input
            type="date"
            value={date}
            readOnly
            style={{ width: "100%", padding: "8px", boxSizing: "border-box", backgroundColor: "#f0f0f0" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Hora:</label>
          <input
            type="text"
            value={hour}
            readOnly
            style={{ width: "100%", padding: "8px", boxSizing: "border-box", backgroundColor: "#f0f0f0" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Crear Orden
        </button>
      </form>
    </div>
  );
};

export default CreateOrdenPage;
