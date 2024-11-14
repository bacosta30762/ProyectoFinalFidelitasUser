import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createOrderSchema } from "../Validaciones/ordenValidation";
import ValidatedInputOrden from "../Validaciones/ValidatedInputOrden";
import { getToken } from "../Servicios/tokenService"; 
import './CreateOrder.css';
import { Toast, ToastContainer } from "react-bootstrap"; 

const CreateOrdenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDate, hour, servicioId } = location.state || {};
  
  const [showToast, setShowToast] = useState(false);

  const formik = useFormik({
    initialValues: {
      vehiclePlate: "",
    },
    validationSchema: createOrderSchema,
    onSubmit: async (values) => {
      const dto = {
        servicioId: servicioId,
        placaVehiculo: values.vehiclePlate,
        hora: parseInt(hour),
        dia: selectedDate.toISOString().split('T')[0], 
      };

      try {
        const token = getToken();
        const response = await fetch("https://localhost:7180/api/Ordenes/crear", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(dto),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error al crear la orden:", errorData);
        } else {
          setShowToast(true);  
          setTimeout(() => {
            navigate("/orden-list"); 
          }, 2000);  
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
      }
    },
  });

  return (
    <div className="create-order-container">
      <h2>Crear Orden</h2>
      <form onSubmit={formik.handleSubmit}>
        <ValidatedInputOrden
          name="vehiclePlate"
          type="text"
          placeholder="Placa del Vehículo"
          value={formik.values.vehiclePlate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.vehiclePlate}
          touched={formik.touched.vehiclePlate}
        />
        <div>
          <strong>Servicio ID:</strong> {servicioId}
        </div>
        <div>
          <strong>Fecha:</strong>{" "}
          {selectedDate ? selectedDate.toLocaleDateString() : "No seleccionado"}
        </div>
        <div>
          <strong>Hora:</strong> {hour ? `${hour}:00` : "No seleccionada"}
        </div>
        <button type="submit">Crear Orden</button>
      </form>

      {/* Toast de éxito */}
      <ToastContainer className="p-3 centered-toast" position="middle-center">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Éxito</strong>
          </Toast.Header>
          <Toast.Body>Orden creada con éxito!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default CreateOrdenPage;

