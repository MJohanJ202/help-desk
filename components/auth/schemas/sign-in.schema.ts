import z from "zod";

export const signInSchema = z.object({
  email: z
    .email("Por favor ingresa un correo válido. Ejemplo: user@mail.com")
    .min(1, {
      message: "Este campo es requerido",
    }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export type SignInDto = z.infer<typeof signInSchema>;
