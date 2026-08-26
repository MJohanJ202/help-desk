import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .email("Por favor ingresa un correo válido. Ejemplo: user@mail.com")
    .min(1, {
      message: "Este campo es requerido",
    }),
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
