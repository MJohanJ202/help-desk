import { Ticket } from "@/interfaces/tickets";

export const STATUS_TIKECTS = {
  open: "Abierto",
  in_progress: "En Proceso",
  waiting_parts: "Esperando Piezas",
  resolved: "Resuelto",
  closed: "Cerrado",
};

export const PRIORITY_TIKECTS = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  urgent: "Urgente",
};

export function getTicketStatus(key: string): string {
  const status = STATUS_TIKECTS[key as keyof typeof STATUS_TIKECTS];
  return status ?? STATUS_TIKECTS.open;
}

export function getTicketPriority(key: string): string {
  const priority = PRIORITY_TIKECTS[key as keyof typeof PRIORITY_TIKECTS];
  return priority ?? PRIORITY_TIKECTS.medium;
}

export const getStats = (data: Ticket[]) => {
  return {
    totalTickets: data.length,
    openTickets: data.filter((t) => t.status === "open").length,
    inProgressTickets: data.filter((t) => t.status === "in_progress").length,
    resolvedTickets: data.filter((t) => t.status === "resolved").length,
  };
};
