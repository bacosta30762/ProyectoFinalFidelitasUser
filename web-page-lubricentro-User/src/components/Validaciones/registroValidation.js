import * as Yup from "yup";

export const registroValidationSchema = Yup.object({
  nombre: Yup.string()
    .max(35, "El nombre no puede ser mayor a 35 caracteres")
    .required("El nombre es requerido"),
  apellidos: Yup.string().required("Los apellidos son requeridos"),
  correo: Yup.string()
    .email("Debe ser un correo válido")
    .required("El correo es requerido"),
  contraseña: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .matches(/\d/, "La contraseña debe contener al menos un número")
    .matches(/[@$!%*?&#]/, "La contraseña debe contener al menos un carácter especial")
    .required("La contraseña es requerida"),
  cedula: Yup.string()
    .max(10, "La cédula no puede ser mayor a 10 caracteres")
    .required("La cédula es requerida"),
});