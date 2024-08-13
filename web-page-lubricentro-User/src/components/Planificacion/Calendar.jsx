import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const hours = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});
  
  // Rango de fechas permitido
  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);

  const handleToggleAppointment = (hour) => {
    const key = `${selectedDate?.toDateString()}-${hour}`;
    setAppointments((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-left">
        <h2>Seleccione un día</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          minDate={today}
          maxDate={oneMonthFromNow}
          filterDate={(date) => date.getDay() >= 1 && date.getDay() <= 5} // Lunes a Viernes
          inline
        />
      </div>

      <div className="calendar-right">
        {selectedDate && selectedDate >= today && selectedDate <= oneMonthFromNow && (
          <>
            <h3 className="mt-4">Disponibilidad para {selectedDate.toDateString()}</h3>
            <Table bordered>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {hours.map((hour) => {
                  const key = `${selectedDate?.toDateString()}-${hour}`;
                  return (
                    <tr key={hour}>
                      <td>{hour}</td>
                      <td className="text-center">
                        <Button
                          variant={appointments[key] ? 'danger' : 'success'}
                          onClick={() => handleToggleAppointment(hour)}
                        >
                          {appointments[key] ? 'Cancelar cita' : 'Agendar cita'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
        {selectedDate && (selectedDate < today || selectedDate > oneMonthFromNow) && (
          <p>Las citas solo están disponibles para hoy y hasta un mes adelante.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
