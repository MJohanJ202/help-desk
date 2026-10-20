import type { LucideIcon } from "lucide-react";

type TicketStatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  iconClassName: string;
};

export function TicketStatCard({
  label,
  value,
  icon: Icon,
  iconClassName,
}: TicketStatCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-200 hover:border-border hover:shadow-md sm:p-5">
      <div className={`shrink-0 rounded-xl p-3 ${iconClassName}`}>
        <Icon className="h-6 w-6" />
      </div>

      <div className="flex min-w-0 flex-col">
        <p className="truncate text-xs font-medium text-muted-foreground">
          {label}
        </p>

        <p className="text-xl font-extrabold tracking-tight sm:text-2xl">
          {value}
        </p>
      </div>
    </article>
  );
}
