import * as z from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "El nombre de usuario debe ser de al menos 3 caracteres",
    })
    .max(50, { message: "El nombre de usuario no debe exceder 50 caracteres" }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe ser de al menos 8 caracteres",
    })
    .max(150, { message: "La contraseña no debe exceder 150 caracteres" }),
});

export const RegisterSchema = LoginSchema.extend({
  nombre: z
    .string()
    .min(3, {
      message: "El nombre debe ser de al menos 3 caracteres",
    })
    .max(50, { message: "El nombre no debe exceder 50 caracteres" }),
});
