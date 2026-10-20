import { z } from "zod";

export const ticketSchema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(150, "El título no puede superar los 150 caracteres"),
  priority: z.enum(["low", "medium", "high", "critical"], {
    message: "Prioridad no válida",
  }),
  status: z.enum(
    ["open", "in_progress", "waiting_parts", "resolved", "closed"],
    {
      message: "Estado no válida",
    },
  ),
  description: z
    .string()
    .max(5000, "La descripción no puede superar los 5000 caracteres")
    .optional()
    .or(z.literal("")),
});

export type TicketFormData = z.infer<typeof ticketSchema>;
