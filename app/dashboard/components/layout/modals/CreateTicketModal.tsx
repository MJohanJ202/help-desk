import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateTicketForm from "../../form/CreateTicketForm";
import { Ticket } from "@/interfaces/tickets";

type Props = {
  open: boolean;
  userId?: string | null;
  onTicketsUpdated?: (tickets: Ticket[]) => void;
  onOpenChange: () => void;
};

export function CreateTicketModal({
  open,
  userId,
  onTicketsUpdated,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-screen flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear un nuevo ticket de soporte</DialogTitle>
        </DialogHeader>

        <CreateTicketForm
          userId={userId}
          handleShowTicketForm={onOpenChange}
          onTicketsUpdated={onTicketsUpdated}
        />
      </DialogContent>
    </Dialog>
  );
}
