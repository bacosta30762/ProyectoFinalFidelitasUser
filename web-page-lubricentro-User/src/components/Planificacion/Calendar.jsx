import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useObtenerHorasDisponiblesQuery } from "../api/horasApi";
import "./Calendar.css";

const Calendar = () => {
  const location = useLocation();
  const { servicioId } = location.state || {};
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const horasLaborales = [8, 9, 10, 11, 12, 13, 14, 15, 16];
  const dia = selectedDate ? selectedDate.toISOString().split("T")[0] : null;

  const {
    data: availableHours = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useObtenerHorasDisponiblesQuery(
    { servicioId, dia },
    { skip: !selectedDate || !servicioId }
  );

  // Refresca las horas disponibles solo cuando la consulta esté disponible
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (selectedDate && servicioId && refetch && !isFetching) {
      refetch(); // Asegurarse de que la consulta esté disponible antes de llamar a refetch
    }
  };

  // Maneja la selección de una hora y navega a la pantalla de creación de orden
  const handleSelectHour = (hour) => {
    navigate("/crear-orden", { state: { selectedDate, hour, servicioId } });
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">
        Seleccione una fecha y hora para su servicio
      </h2>

      <div className="calendar-content">
        <div className="calendar-left">
          <DatePicker 
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
            placeholderText="Seleccione una fecha"
            inline
          />
        </div>

        <div className="calendar-right">
          {isLoading ? (
            <p>Cargando horas disponibles...</p>
          ) : isError ? (
            <p>Error al cargar las horas.</p>
          ) : (
            <table className="hours-table">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {horasLaborales.map((hour) => (
                  <tr key={hour}>
                    <td>{`${hour}:00`}</td>
                    <td>
                      {availableHours.includes(hour) ? (
                        <Button
                          variant="success"
                          onClick={() => handleSelectHour(hour)}
                        >
                          Agendar cita
                        </Button>
                      ) : (
                        <Button variant="danger" disabled>
                          Cita ocupada
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
