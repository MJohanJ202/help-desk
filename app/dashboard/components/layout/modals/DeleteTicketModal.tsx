import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ticket } from "@/interfaces/tickets";
import { deleteTicket } from "@/actions/ticket/delete-ticket";
import { toast } from "@/components/ui/toast";

type Props = {
  open: boolean;
  userId?: string | null;
  ticket?: Ticket | null;
  onTicketsUpdated?: (tickets: Ticket[]) => void;
  onOpenChange: () => void;
};

export function DeleteTicketModal({
  open,
  ticket,
  onTicketsUpdated,
  onOpenChange,
}: Props) {
  const handleDeleteTicket = async () => {
    if (!ticket) return;
    try {
      const res = await deleteTicket({
        userId: ticket.user_id,
        ticketId: ticket.id,
        imageUrl: ticket.image_url,
      });

      toast.add({
        title: "Ticket eliminado",
        type: "success",
        description: "El ticket ha sido eliminado",
      });

      if (res.success && res.data) {
        onTicketsUpdated?.(res.data);
      }
      onOpenChange();
    } catch (error) {
      console.error(error);
      toast.add({
        title: "Error al eliminar el ticket",
        type: "error",
        description: "El ticket no pudo ser eliminado",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Ticket</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          ¿Esta seguro de eliminar este ticket?
        </DialogDescription>
        <div className="flex items-center gap-2">
          <Button
            onClick={onOpenChange}
            variant="secondary"
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteTicket}
            variant="destructive"
            className="cursor-pointer"
          >
            Aceptar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
