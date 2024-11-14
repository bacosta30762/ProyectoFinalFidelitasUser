import React, { useState } from "react";

const VerSuscripcionesPage = () => {
  const [suscripciones, setSuscripciones] = useState([
    {
      email: "saul23@domain.com",
      telefono: "7654-4425",
      tipo: "Boletín Informativo",
    },
    {
      email: "saul23@domain.com",
      telefono: "7654-4425",
      tipo: "Boletín Promocional",
    },
  ]);

  const handleEliminarSuscripcion = (index) => {
    const nuevasSuscripciones = suscripciones.filter((_, i) => i !== index);
    setSuscripciones(nuevasSuscripciones);
  };

  const handleModificarSuscripcion = (index) => {
    const suscripcion = suscripciones[index];
    // Lógica para modificar la suscripción, como abrir un formulario modal
    console.log("Modificar suscripción:", suscripcion);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Suscripciones</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {suscripciones.map((suscripcion, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>Email:</strong> {suscripcion.email}
            </p>
            <p>
              <strong>Teléfono Celular:</strong> {suscripcion.telefono}
            </p>
            <p>
              <strong>Tipo:</strong> {suscripcion.tipo}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => handleModificarSuscripcion(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#ffc107",
                  color: "#000",
                  border: "none",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
              >
                Modificar
              </button>
              <button
                onClick={() => handleEliminarSuscripcion(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerSuscripcionesPage;
