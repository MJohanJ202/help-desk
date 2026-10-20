import { Plus } from "lucide-react";

type TicketPageHeaderProps = {
  onCreate: () => void;
};

export function TicketPageHeader({ onCreate }: TicketPageHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="flex flex-col gap-1 w-full sm:max-w-xl">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Tus tickets
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Aquí puedes ver el estado de tus tickets, y gestionarlos de forma
          eficiente.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-full cursor-pointer flex items-center gap-2 hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shrink-0"
      >
        <Plus className="w-5 h-5" />
        <span>Crear ticket</span>
      </button>
    </header>
  );
}
