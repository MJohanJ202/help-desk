import { Calendar, Eye, NotebookPen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  createdAt: string | null;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function TicketCardFooter({
  createdAt,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const formattedDate = createdAt
    ? new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "short",
      }).format(new Date(createdAt))
    : "Reciente";

  return (
    <footer className="flex items-center justify-between gap-3 pt-4 border-t border-border/50 mt-auto flex-wrap sm:flex-nowrap">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium shrink-0">
        <Calendar className="w-4 h-4 shrink-0" />
        <span>{formattedDate}</span>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-auto">
        <Button
          type="button"
          variant="ghost"
          onClick={onView}
          title="Ver detalle"
          aria-label="Ver detalle del ticket"
          className="w-11 h-11 p-0 flex items-center justify-center bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-xs"
        >
          <Eye className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onEdit}
          title="Editar ticket"
          aria-label="Editar ticket"
          className="w-11 h-11 p-0 flex items-center justify-center bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-xs"
        >
          <NotebookPen className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onDelete}
          title="Eliminar ticket"
          aria-label="Eliminar ticket"
          className="w-11 h-11 p-0 flex items-center justify-center bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-xs"
        >
          <Trash className="h-5 w-5" />
        </Button>
      </div>
    </footer>
  );
}
