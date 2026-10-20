export interface Ticket {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "waiting_parts" | "resolved" | "closed";
  created_at: string;
  updated_at: string;
}

export type Tickets = Ticket[];
export type TicketFiltersType = {
  status: Ticket["status"] | "all";
  priority: Ticket["priority"] | "all";
  search: string;
};
