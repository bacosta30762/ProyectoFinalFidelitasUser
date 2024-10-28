import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida"),
});