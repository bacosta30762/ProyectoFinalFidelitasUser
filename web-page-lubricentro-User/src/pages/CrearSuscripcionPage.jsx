import React, { useState } from "react";

const CrearSuscripcionPage = () => {
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [suscripciones, setSuscripciones] = useState([]);

  const handleCrearSuscripcion = (e) => {
    e.preventDefault();
    const nuevaSuscripcion = { email, telefono };
    setSuscripciones([...suscripciones, nuevaSuscripcion]);
    setEmail("");
    setTelefono("");
  };

  const handleEliminarSuscripcion = (index) => {
    const nuevasSuscripciones = suscripciones.filter((_, i) => i !== index);
    setSuscripciones(nuevasSuscripciones);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Crear Suscripción</h1>
      <form
        onSubmit={handleCrearSuscripcion}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Teléfono Celular:
          </label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
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
          Crear
        </button>
      </form>

      {suscripciones.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Suscripciones Creadas</h2>
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CrearSuscripcionPage;
