"use client";

import { cleanImageUrl } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

export function TicketImage({ url, alt }: { url?: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const cleaned = cleanImageUrl(url);

  if (!cleaned || hasError) {
    return (
      <div
        className="w-12 h-12 rounded-xl bg-muted/80 border border-border/80 flex items-center justify-center shrink-0 text-muted-foreground shadow-inner"
        title="Sin imagen disponible"
      >
        <ImageIcon className="w-6 h-6" />
      </div>
    );
  }

  return (
    <img
      className="w-12 h-12 rounded-xl object-cover ring-2 ring-border/60 shrink-0 group-hover:scale-105 transition-transform duration-300 bg-muted"
      src={cleaned}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}
