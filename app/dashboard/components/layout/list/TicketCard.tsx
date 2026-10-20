import { TicketCardHeader } from "./TicketCardHeader";
import { TicketCardContent } from "./TicketCardContent";
import { TicketCardFooter } from "./TicketCardFooter";
import { Ticket } from "@/interfaces/tickets";

type Props = {
  ticket: Ticket;
  onView: (ticket: Ticket) => void;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
};

export function TicketCard({ ticket, onView, onEdit, onDelete }: Props) {
  return (
    <article className="bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-4 group relative overflow-hidden h-73">
      <TicketCardHeader
        status={ticket.status}
        priority={ticket.priority}
        title={ticket.title}
        imageUrl={ticket.image_url}
      />

      <TicketCardContent
        title={ticket.title}
        description={ticket.description}
      />

      <TicketCardFooter
        createdAt={ticket.created_at}
        onView={() => onView(ticket)}
        onEdit={() => onEdit(ticket)}
        onDelete={() => onDelete(ticket)}
      />
    </article>
  );
}
