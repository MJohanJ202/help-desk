type Props = {
  title: string;
  description: string | null;
};

export function TicketCardContent({ title, description }: Props) {
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0 overflow-hidden">
      <h2 className="font-bold text-base md:text-lg leading-snug text-foreground group-hover:text-primary transition-colors duration-200 wrap-break-word cursor-pointer">
        {title}
      </h2>

      <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word font-normal">
        {description || "Sin descripción"}
      </p>
    </div>
  );
}
