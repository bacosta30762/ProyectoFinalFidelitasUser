import * as Yup from 'yup';

export const modificarUsuarioValidationSchema = Yup.object({
  nombre: Yup.string()
    .max(35, "El nombre no puede ser mayor a 35 caracteres")
    .required("El nombre es requerido"),
  apellidos: Yup.string()
    .required("Los apellidos son requeridos"),
  correo: Yup.string()
    .email("Debe ser un correo válido")
    .required("El correo es requerido"),
  cedula: Yup.string()
    .max(10, "La cédula no puede ser mayor a 10 caracteres")
    .required("La cédula es requerida"),
});
