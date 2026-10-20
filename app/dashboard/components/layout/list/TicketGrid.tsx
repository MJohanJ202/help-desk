import { Ticket } from "@/interfaces/tickets";
import { TicketCard } from "./TicketCard";
import { TicketEmptyState } from "./TicketEmptyState";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  tickets: Ticket[];
  onView: (ticket: Ticket) => void;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  sentinelRef?: React.RefObject<HTMLDivElement | null>;
};

export function TicketGrid({
  tickets,
  onView,
  onEdit,
  onDelete,
  onClearFilters,
  isLoading = false,
  isLoadingMore = false,
  hasMore = false,
  sentinelRef,
}: Props) {
  // Skeleton mientras carga la primera página de tickets
  if (isLoading && tickets.length === 0) {
    return (
      <section className="mt-2 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-8 justify-start">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm h-73 flex flex-col justify-between animate-pulse"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border/50">
                <div className="flex gap-2">
                  <div className="h-5 w-20 bg-muted rounded-full" />
                  <div className="h-5 w-16 bg-muted rounded-md" />
                </div>
                <div className="w-12 h-12 bg-muted rounded-xl" />
              </div>

              <div className="flex flex-col gap-2.5 flex-1 pt-3">
                <div className="h-5 w-4/5 bg-muted rounded-md" />
                <div className="h-3.5 w-full bg-muted/70 rounded-md" />
                <div className="h-3.5 w-2/3 bg-muted/70 rounded-md" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="h-4 w-20 bg-muted rounded-md" />
                <div className="flex gap-2">
                  <div className="w-9 h-9 bg-muted rounded-xl" />
                  <div className="w-9 h-9 bg-muted rounded-xl" />
                  <div className="w-9 h-9 bg-muted rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (tickets.length === 0) {
    return <TicketEmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <section className="mt-2 w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-8 justify-start">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Elemento centinela observado por IntersectionObserver */}
      <div ref={sentinelRef} className="h-2 w-full pointer-events-none" />

      {/* Indicador de carga para páginas subsiguientes */}
      {isLoadingMore && (
        <div className="flex items-center justify-center gap-2.5 py-4 text-sm font-medium text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Cargando más tareas...</span>
        </div>
      )}

      {/* Mensaje al llegar al final del listado */}
      {!hasMore && tickets.length > 0 && !isLoading && (
        <div className="text-center py-6 text-xs font-semibold text-muted-foreground/60 border-t border-border/40">
          Has llegado al final de las tareas
        </div>
      )}
    </section>
  );
}
