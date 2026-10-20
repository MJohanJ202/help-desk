import { Loader2, Search } from "lucide-react";

type TicketSearchProps = {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
};

export function TicketSearch({
  value,
  onChange,
  isLoading = false,
}: TicketSearchProps) {
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <label
          htmlFor="search-ticket"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
        >
          Buscar tickets por título
        </label>
      </div>

      <div className="relative w-full">
        <input
          type="text"
          id="search-ticket"
          placeholder="Filtra por título o descripción..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-card border border-border rounded-full pl-4 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 shadow-sm"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {isLoading && (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          )}
          {value && !isLoading && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Limpiar búsqueda"
              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
