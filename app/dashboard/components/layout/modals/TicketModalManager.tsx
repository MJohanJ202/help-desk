import { ActiveModal } from "@/app/dashboard/page";
import { CreateTicketModal } from "./CreateTicketModal";
import { EditTicketModal } from "./EditTicketModal";
import { DeleteTicketModal } from "./DeleteTicketModal";
import { TicketDetailModal } from "./TicketDetailModal";

import { Ticket } from "@/interfaces/tickets";

export function TicketModalManager({
  activeModal,
  userId,
  onTicketsUpdated,
  onOpenChange,
}: {
  activeModal: ActiveModal;
  userId?: string | null;
  onTicketsUpdated: (tickets: Ticket[]) => void;
  onOpenChange: () => void;
}) {
  switch (activeModal?.type) {
    case "create":
      return (
        <CreateTicketModal
          open={true}
          userId={userId}
          onTicketsUpdated={onTicketsUpdated}
          onOpenChange={onOpenChange}
        />
      );
    case "edit":
      return (
        <EditTicketModal
          open={true}
          onOpenChange={onOpenChange}
          onTicketsUpdated={onTicketsUpdated}
          userId={activeModal.ticket.user_id}
          ticketId={activeModal.ticket.id}
          imageUrl={activeModal.ticket.image_url ?? ""}
          prevData={{
            title: activeModal.ticket.title,
            status: activeModal.ticket.status,
            priority: activeModal.ticket.priority,
            description: activeModal.ticket.description ?? "",
          }}
        />
      );
    case "delete":
      return (
        <DeleteTicketModal
          open={true}
          ticket={activeModal.ticket}
          onTicketsUpdated={onTicketsUpdated}
          onOpenChange={onOpenChange}
        />
      );
    case "detail":
      return (
        <TicketDetailModal
          ticket={activeModal.ticket}
          isOpen={true}
          onClose={() => onOpenChange()}
        />
      );
    default:
      return null;
  }
}
