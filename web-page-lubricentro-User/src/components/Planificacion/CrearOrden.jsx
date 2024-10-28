import React from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { createOrderSchema } from "../Validaciones/ordenValidation";
import ValidatedInput from "../Validaciones/inputValidation";
import './CreateOrder.css';

const CreateOrdenPage = () => {
  const location = useLocation();
  const { selectedDate, hour, serviceId } = location.state || {};

  const formik = useFormik({
    initialValues: {
      vehiclePlate: "",
    },
    validationSchema: createOrderSchema,
    onSubmit: async (values) => {
      const dto = {
        ServicioId: serviceId,
        PlacaVehiculo: values.vehiclePlate,
        Hora: parseInt(hour),
        Dia: selectedDate.toISOString().split('T')[0],
      };
      
      // Enviar la solicitud de creación de orden
      console.log("Orden creada con los siguientes datos:", dto);
      // Aquí podrías hacer el fetch para crear la orden en tu API.
    },
  });

  return (
    <div className="create-order-container">
      <h2>Crear Orden</h2>
      <form onSubmit={formik.handleSubmit}>
        <ValidatedInput
          name="vehiclePlate"
          type="text"
          placeholder="Placa del Vehículo"
          value={formik.values.vehiclePlate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.vehiclePlate && formik.errors.vehiclePlate ? (
          <div className="error">{formik.errors.vehiclePlate}</div>
        ) : null}
        <button type="submit">Crear Orden</button>
      </form>
    </div>
  );
};

export default CreateOrdenPage;
