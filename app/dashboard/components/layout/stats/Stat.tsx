import { FileText, Clock, Wrench, CheckCircle } from "lucide-react";
import { TicketStatCard } from "./Statcard";

type TicketStatsProps = {
  stats: {
    totalTickets: number;
    openTickets: number;
    inProgressTickets: number;
    resolvedTickets: number;
  };
};

export function TicketStats({ stats }: TicketStatsProps) {
  const items = [
    {
      label: "Total tickets",
      value: stats.totalTickets,
      icon: FileText,
      iconClassName: "bg-primary/10 text-primary",
    },
    {
      label: "Abiertos",
      value: stats.openTickets,
      icon: Clock,
      iconClassName: "bg-amber-500/10 text-amber-500",
    },
    {
      label: "En proceso",
      value: stats.inProgressTickets,
      icon: Wrench,
      iconClassName: "bg-blue-500/10 text-blue-500",
    },
    {
      label: "Resueltos",
      value: stats.resolvedTickets,
      icon: CheckCircle,
      iconClassName: "bg-emerald-500/10 text-emerald-500",
    },
  ];

  return (
    <section aria-label="Estadísticas de tickets" className="w-full">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <TicketStatCard key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
}
