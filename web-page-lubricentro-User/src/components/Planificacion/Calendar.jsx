import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useObtenerHorasDisponiblesQuery } from "../api/horasApi";
import './Calendar.css';

const Calendar = () => {
  const { servicioId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const dia = selectedDate ? selectedDate.toISOString().split('T')[0] : null;


  useEffect(() => {
    console.log(servicioId,selectedDate);
  
  }, [selectedDate, servicioId]);
  
  /*//hook para obtener las horas disponibles
  const { data: availableHours = [], isLoading, isError } = useObtenerHorasDisponiblesQuery(
    { servicioId: serviceId, dia },
    { skip: !selectedDate || !serviceId }
  );*/

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleSelectHour = (hour) => {
    navigate("/crear-orden", { state: { selectedDate, hour, servicioId } });
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Seleccione una fecha y hora para su servicio</h2>

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

      
    </div>
  );
};

export default Calendar;
