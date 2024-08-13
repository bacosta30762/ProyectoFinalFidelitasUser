import React, { useState } from "react";

const CreateOrdenPage = () => {
  const [orderNumber, setOrderNumber] = useState(1);
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [serviceProvided, setServiceProvided] = useState("");
  const [date, setDate] = useState("");
  const [orders, setOrders] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      orderNumber,
      vehiclePlate,
      serviceProvided,
      date,
    };
    setOrders([...orders, newOrder]);
    setOrderNumber(orderNumber + 1);
    setVehiclePlate("");
    setServiceProvided("");
    setDate("");
  };

  const today = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Detalle de Orden de Servicio</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Número de Orden:
          </label>
          <input
            type="text"
            value={orderNumber}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              backgroundColor: "#f0f0f0",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Placa del Vehículo:
          </label>
          <input
            type="text"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Servicio Prestado:
          </label>
          <input
            type="text"
            value={serviceProvided}
            onChange={(e) => setServiceProvided(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Fecha:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={today} // No permitir seleccionar fechas anteriores a la actual
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
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

      {orders.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Órdenes Creadas:</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {orders.map((order) => (
              <li
                key={order.orderNumber}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <strong>Número de Orden:</strong> {order.orderNumber}
                </p>
                <p>
                  <strong>Placa del Vehículo:</strong> {order.vehiclePlate}
                </p>
                <p>
                  <strong>Servicio Prestado:</strong> {order.serviceProvided}
                </p>
                <p>
                  <strong>Fecha:</strong> {order.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateOrdenPage;
