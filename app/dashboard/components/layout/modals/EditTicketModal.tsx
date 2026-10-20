import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TicketFormData } from "@/app/dashboard/schemas/ticket.schema";
import UpdateTicketForm from "../../form/UpdateTicketForm";
import { Ticket } from "@/interfaces/tickets";

type Props = {
  open: boolean;
  userId?: string | null;
  onOpenChange: () => void;
  onTicketsUpdated?: (tickets: Ticket[]) => void;
  prevData: TicketFormData;
  imageUrl: string | null | undefined;
  ticketId: string | null | undefined;
};

export function EditTicketModal({
  open,
  userId,
  onOpenChange,
  onTicketsUpdated,
  prevData,
  imageUrl,
  ticketId,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-scroll h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Editar un ticket de soporte</DialogTitle>
        </DialogHeader>
        <UpdateTicketForm
          prevData={prevData}
          userId={userId}
          imageUrl={imageUrl}
          ticketId={ticketId}
          handleShowTicketForm={onOpenChange}
          onTicketsUpdated={onTicketsUpdated}
        />
      </DialogContent>
    </Dialog>
  );
}
