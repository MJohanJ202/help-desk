import { getTicketPriority, getTicketStatus } from "@/lib/tickets/stats";
import { TicketImage } from "../../image/TicketImage";
import { Ticket } from "@/interfaces/tickets";

type Props = {
  status: Ticket["status"];
  priority: Ticket["priority"];
  title: string;
  imageUrl: string | null;
};

export function TicketCardHeader({ status, priority, title, imageUrl }: Props) {
  return (
    <header className="flex items-start justify-between gap-3 border-b border-border/50 pb-4">
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadgeStyle(
              status,
            )}`}
          >
            {getTicketStatus(status)}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-md border ${getPriorityBadgeStyle(
              priority,
            )}`}
          >
            {getTicketPriority(priority)}
          </span>
        </div>
      </div>

      <TicketImage url={imageUrl ?? ""} alt={title} />
    </header>
  );
}

function getStatusBadgeStyle(status: string) {
  switch (status) {
    case "open":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
    case "in_progress":
      return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30";
    case "waiting_parts":
      return "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30";
    case "resolved":
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
    case "closed":
      return "bg-muted text-muted-foreground border-border";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function getPriorityBadgeStyle(priority: string) {
  switch (priority) {
    case "low":
      return "bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/20";
    case "medium":
      return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
    case "high":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "urgent":
    case "critical":
      return "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 font-bold animate-pulse";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}
