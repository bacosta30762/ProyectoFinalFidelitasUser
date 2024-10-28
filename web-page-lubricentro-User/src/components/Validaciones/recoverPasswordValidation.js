import * as Yup from 'yup';

export const recoverPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo inválido')
    .required('El correo es requerido'),
});

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo inválido')
    .required('El correo es requerido'),
  token: Yup.string().required('El token es requerido'),
  newPassword: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .matches(/\d/, "La contraseña debe contener al menos un número")
    .matches(/[@$!%*?&#]/, "La contraseña debe contener al menos un carácter especial")
    .required("La contraseña es requerida"),
});
