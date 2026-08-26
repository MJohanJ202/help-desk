"use client";
import { AvatarBadge } from "@/components/dashboard/AvatarBadge";
import { useAuth } from "@/context/auth.context";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <main className="">
      <nav className="w-full flex items-center justify-between px-6 py-4">
        <div className="text-xl font-extrabold tracking-tight flex items-center gap-3">
          <LayoutGrid className="w-10 h-10" />
          <span>Help Desk</span>
        </div>

        {user && (
          <Link href="/profile">
            <AvatarBadge name={user.name} avatar_url={user.avatar_url ?? ""} />
          </Link>
        )}
      </nav>
    </main>
  );
}
