import z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .max(20, "El nombre no puede tener más de 20 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),

  email: z
    .email("Por favor ingresa un correo válido. Ejemplo: user@mail.com")
    .min(1, {
      message: "Este campo es requerido",
    }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export type SignUpDto = z.infer<typeof signUpSchema>;
