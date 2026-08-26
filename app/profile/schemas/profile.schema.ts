import z from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.email().optional(),
  avatar_url: z.string().nullable().optional(),
  phone: z.string().optional().nullable(),
  country_code: z.string().optional().nullable(),
});

export type ProfileDto = z.infer<typeof profileSchema>;
