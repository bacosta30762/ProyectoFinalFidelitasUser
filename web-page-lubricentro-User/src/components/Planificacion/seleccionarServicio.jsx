import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectSevice.css';

const servicios = [
  { id: 1, nombre: 'Cambio de aceite' },
  { id: 2, nombre: 'Mecánica rápida' },
  { id: 3, nombre: 'Revisión y cambio de llantas' },
];

const SelectService = () => {
  const [servicioId, setServicioId] = useState(null);
  const navigate = useNavigate();

  const handleServiceSelect = () => {
    if (servicioId) {
      navigate('/calendario', { state: { servicioId } }); // Pasar `servicioId` como estado
    }
  };

  return (
    <div className="select-service-container">
      <h2>Seleccione un servicio</h2>
      <select
        onChange={(e) => setServicioId(Number(e.target.value))}
        value={servicioId || ''}
      >
        <option value="">Seleccione...</option>
        {servicios.map((servicio) => (
          <option key={servicio.id} value={servicio.id}>
            {servicio.nombre}
          </option>
        ))}
      </select>
      <button onClick={handleServiceSelect}>Continuar</button>
    </div>
  );
};

export default SelectService;
