import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { AvatarBadge } from "@/components/dashboard/AvatarBadge";

type TicketNavbarProps = {
  user: {
    name: string;
    avatar_url: string | null;
  } | null;
};

export function TicketNavbar({ user }: TicketNavbarProps) {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-30">
      <div className="text-xl font-extrabold tracking-tight flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <LayoutGrid className="w-6 h-6" />
        </div>
        <span>Help Desk</span>
      </div>

      {user && (
        <Link href="/profile">
          <AvatarBadge name={user.name} avatar_url={user.avatar_url ?? ""} />
        </Link>
      )}
    </nav>
  );
}
