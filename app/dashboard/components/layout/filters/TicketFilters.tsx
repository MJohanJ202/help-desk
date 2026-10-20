import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TicketFiltersType } from "@/interfaces/tickets";
import { Filter, SlidersHorizontal } from "lucide-react";

type TicketFilterFieldsProps = {
  status: TicketFiltersType["status"];
  priority: TicketFiltersType["priority"];
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  activeFiltersCount: number;
};

const statusOptions = [
  { value: "all", label: "Todos los estados" },
  { value: "open", label: "Abiertos" },
  { value: "in_progress", label: "En proceso" },
  { value: "waiting_parts", label: "Esperando piezas" },
  { value: "resolved", label: "Resueltos" },
  { value: "closed", label: "Cerrados" },
];

const priorityOptions = [
  { value: "all", label: "Todas las prioridades" },
  { value: "low", label: "Baja" },
  { value: "medium", label: "Media" },
  { value: "high", label: "Alta" },
  { value: "critical", label: "Crítica" },
  { value: "urgent", label: "Urgente" },
];

export function TicketFilters({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
  activeFiltersCount,
}: TicketFilterFieldsProps) {
  return (
    <>
      <div className="md:hidden">
        <Dialog>
          <DialogTrigger className="h-10.5 px-4 border border-border rounded-full font-semibold text-sm flex items-center gap-2 bg-card hover:bg-muted transition-colors cursor-pointer shrink-0 shadow-sm">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold ml-0.5">
                {activeFiltersCount}
              </span>
            )}
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-3xl p-6 bg-card border-border text-foreground">
            <DialogHeader className="pb-3 border-b border-border">
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filtros de Tickets
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-5 py-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <label
                    htmlFor="mobile-ticket-status"
                    className="font-semibold text-sm"
                  >
                    Filtrar por estado
                  </label>
                </div>
                <select
                  name="ticket-status"
                  id="mobile-ticket-status"
                  value={status}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="w-full border border-border rounded-2xl px-4 py-2.5 text-sm bg-background outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <label
                    htmlFor="mobile-ticket-priority"
                    className="font-semibold text-sm"
                  >
                    Filtrar por prioridad
                  </label>
                </div>
                <select
                  name="ticket-priority"
                  id="mobile-ticket-priority"
                  value={priority}
                  onChange={(e) => onPriorityChange(e.target.value)}
                  className="w-full border border-border rounded-2xl px-4 py-2.5 text-sm bg-background outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  onStatusChange("all");
                  onPriorityChange("all");
                }}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground underline cursor-pointer"
              >
                Restablecer filtros
              </button>
              <DialogClose className="bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-full text-sm cursor-pointer hover:opacity-90 transition-opacity">
                Aplicar
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="hidden md:flex items-end gap-4 shrink-0">
        <div className="flex min-w-45 flex-col gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />

            <label
              htmlFor="filter-ticket-status"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
            >
              Filtrar por estado
            </label>
          </div>

          <select
            name="ticket-status"
            id="filter-ticket-status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="w-full border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer bg-card shadow-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-45 flex-col gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />

            <label
              htmlFor="filter-ticket-priority"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
            >
              Filtrar por prioridad
            </label>
          </div>

          <select
            name="ticket-priority"
            id="filter-ticket-priority"
            value={priority}
            onChange={(event) => onPriorityChange(event.target.value)}
            className="w-full border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer bg-card shadow-sm"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
