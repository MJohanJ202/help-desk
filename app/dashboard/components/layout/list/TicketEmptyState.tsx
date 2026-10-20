import { Search } from "lucide-react";

type Props = {
  onClearFilters: () => void;
};

export function TicketEmptyState({ onClearFilters }: Props) {
  return (
    <div className="bg-card border border-border border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-3">
      <div className="p-4 rounded-full bg-muted text-muted-foreground">
        <Search className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold">No se encontraron tickets</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        No hay resultados que coincidan con la búsqueda o los filtros
        seleccionados.
      </p>
      <button
        onClick={onClearFilters}
        className="mt-2 text-xs font-semibold text-primary underline cursor-pointer"
      >
        Limpiar filtros
      </button>
    </div>
  );
}
