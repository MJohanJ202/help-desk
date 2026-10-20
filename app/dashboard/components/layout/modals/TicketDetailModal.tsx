"use client";

import { useEffect, useState } from "react";
import { Ticket } from "@/interfaces/tickets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getTicketPriority,
  getTicketStatus,
} from "../../../../../lib/tickets/stats";
import {
  Calendar,
  Clock,
  FileText,
  Image as ImageIcon,
  Tag,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Package,
  ShieldAlert,
  Info,
  Maximize2,
} from "lucide-react";

interface TicketDetailModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

function cleanImageUrl(url?: string | null): string | null {
  if (!url || url.trim() === "") return null;
  const match = url.match(/https?:\/\/[^\s\)]+/);
  return match ? match[0] : url;
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

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "open":
      return <Clock className="w-4 h-4 text-amber-500 shrink-0" />;
    case "in_progress":
      return <Wrench className="w-4 h-4 text-blue-500 shrink-0" />;
    case "waiting_parts":
      return <Package className="w-4 h-4 text-purple-500 shrink-0" />;
    case "resolved":
    case "closed":
      return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
    default:
      return <Tag className="w-4 h-4 text-muted-foreground shrink-0" />;
  }
}

function PriorityIcon({ priority }: { priority: string }) {
  switch (priority) {
    case "low":
      return <Info className="w-4 h-4 text-slate-500 shrink-0" />;
    case "medium":
      return <Tag className="w-4 h-4 text-sky-500 shrink-0" />;
    case "high":
      return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
    case "urgent":
    case "critical":
      return <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />;
    default:
      return <Tag className="w-4 h-4 text-muted-foreground shrink-0" />;
  }
}

export function TicketDetailModal({
  ticket,
  isOpen,
  onClose,
}: TicketDetailModalProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  useEffect(() => {
    setImageError(false);
    setIsImageFullscreen(false);
  }, [ticket]);

  if (!ticket) return null;

  const cleanedImage = cleanImageUrl(ticket.image_url);

  const formattedDate = ticket.created_at
    ? new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(ticket.created_at))
    : "Sin fecha";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl sm:max-w-4xl w-[95vw] p-6 sm:p-8 bg-card border border-border/80 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader className="border-b border-border/50 pb-4 pr-6">
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight leading-snug">
            {ticket.title}
          </DialogTitle>
        </DialogHeader>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4 items-start">
          {/* Left Column: Metadata & Description */}
          <div className="flex flex-col gap-6">
            {/* Status & Priority Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-muted/30 border border-border/60">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <StatusIcon status={ticket.status} />
                  Estado
                </span>
                <div className="flex items-center mt-1">
                  <span
                    className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 ${getStatusBadgeStyle(
                      ticket.status,
                    )}`}
                  >
                    {getTicketStatus(ticket.status)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-muted/30 border border-border/60">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <PriorityIcon priority={ticket.priority} />
                  Prioridad
                </span>
                <div className="flex items-center mt-1">
                  <span
                    className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 ${getPriorityBadgeStyle(
                      ticket.priority,
                    )}`}
                  >
                    {getTicketPriority(ticket.priority)}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-muted/20 border border-border/60">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary shrink-0" />
                Descripción
              </span>
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-medium whitespace-pre-line">
                {ticket.description && ticket.description.trim() !== ""
                  ? ticket.description
                  : "Sin descripción detallada proporcionada para este ticket."}
              </p>
            </div>

            {/* Created At Date */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-semibold px-3 py-2 rounded-xl bg-muted/40 border border-border/40 w-fit">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span>CREADO EL {formattedDate.toUpperCase()}</span>
            </div>
          </div>

          {/* Right Column: Image Attachment */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-primary shrink-0" />
              Imagen Adjunta
            </span>

            {cleanedImage && !imageError ? (
              <div
                onClick={() => setIsImageFullscreen(true)}
                className="relative w-full h-64 sm:h-80 rounded-2xl border border-border/80 bg-muted/30 overflow-hidden group cursor-pointer shadow-md flex items-center justify-center p-2 transition-all hover:border-primary/50"
              >
                <img
                  src={cleanedImage}
                  alt={ticket.title}
                  className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200">
                  <div className="flex items-center gap-2 bg-black/70 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xs shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                    <span>Ver imagen completa</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-64 sm:h-80 rounded-2xl border border-border/80 bg-muted/30 flex flex-col items-center justify-center text-muted-foreground p-6 text-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-muted/80 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 opacity-60" />
                </div>
                <p className="text-sm font-semibold">Sin imagen adjunta</p>
                <p className="text-xs text-muted-foreground/80">
                  Este ticket no incluye archivos multimedia.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Fullscreen Image Overlay inside Modal if clicked */}
        {isImageFullscreen && cleanedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsImageFullscreen(false);
            }}
          >
            <img
              src={cleanedImage}
              alt={ticket.title}
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
