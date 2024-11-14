import * as Yup from 'yup';

export const createOrderSchema = Yup.object().shape({
  vehiclePlate: Yup.string()
    .required("La placa del vehículo es requerida"),
});

