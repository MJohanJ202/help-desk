"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/auth.context";

import { getTickets } from "@/actions/ticket/get-tickets";
import { getStats } from "../../lib/tickets/stats";

import type { Ticket, TicketFiltersType } from "@/interfaces/tickets";

import { TicketNavbar } from "./components/layout/header/Navbar";
import { TicketPageHeader } from "./components/layout/header/Header";
import { TicketStats } from "./components/layout/stats/Stat";
import { TicketSearch } from "./components/layout/filters/TikectSearch";
import { TicketFilters } from "./components/layout/filters/TicketFilters";
import { TicketGrid } from "./components/layout/list/TicketGrid";
import { TicketModalManager } from "./components/layout/modals/TicketModalManager";
import { useDebounce } from "@/hooks/useDebounce";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { DEFAULT_PAGE_SIZE } from "@/lib/tickets";

const INITIAL_FILTERS: TicketFiltersType = {
  search: "",
  status: "all",
  priority: "all",
};

export type ActiveModal =
  | { type: "create" }
  | { type: "detail"; ticket: Ticket }
  | { type: "edit"; ticket: Ticket }
  | { type: "delete"; ticket: Ticket }
  | null;

export default function DashboardPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [filters, setFilters] = useState<TicketFiltersType>(INITIAL_FILTERS);
  const debouncedSearch = useDebounce(filters.search, 400);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const stats = useMemo(() => getStats(tickets), [tickets]);

  const activeFiltersCount =
    (filters.status !== "all" ? 1 : 0) + (filters.priority !== "all" ? 1 : 0);

  const openCreateModal = () => {
    setActiveModal({ type: "create" });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    if (!user) return;

    let isCurrent = true;
    setIsLoading(true);
    setPage(1);

    getTickets({
      userId: user.id,
      filters: {
        status: filters.status,
        priority: filters.priority,
        search: debouncedSearch,
      },
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    })
      .then((res) => {
        if (isCurrent && res.success) {
          setTickets(res.data);
          setHasMore(res.hasMore);
          setPage(1);
        }
      })
      .catch((error) => {
        if (error instanceof Error) console.error(error.message);
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [user, debouncedSearch, filters.status, filters.priority]);

  // Función para cargar la siguiente página (Infinite Scroll)
  const loadMoreTickets = useCallback(() => {
    if (!user || isLoading || isLoadingMore || !hasMore) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);

    getTickets({
      userId: user.id,
      filters: {
        status: filters.status,
        priority: filters.priority,
        search: debouncedSearch,
      },
      page: nextPage,
      pageSize: DEFAULT_PAGE_SIZE,
    })
      .then((res) => {
        if (res.success) {
          setTickets((prev) => {
            const existingIds = new Set(prev.map((t) => t.id));
            const newTickets = res.data.filter((t) => !existingIds.has(t.id));
            return [...prev, ...newTickets];
          });
          setPage(nextPage);
          setHasMore(res.hasMore);
        }
      })
      .catch((error) => {
        if (error instanceof Error) console.error(error.message);
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }, [
    user,
    isLoading,
    isLoadingMore,
    hasMore,
    page,
    debouncedSearch,
    filters.status,
    filters.priority,
  ]);

  // Hook IntersectionObserver conectado al centinela
  const sentinelRef = useIntersectionObserver(loadMoreTickets, {
    enabled: hasMore && !isLoading && !isLoadingMore,
    rootMargin: "250px",
  });

  return (
    <main className="min-h-screen pb-12 bg-background text-foreground transition-colors duration-300">
      <TicketNavbar user={user} />

      <div className="flex flex-col p-4 sm:py-8 sm:px-8 xl:px20 gap-8">
        <TicketPageHeader onCreate={openCreateModal} />
        <TicketStats stats={stats} />

        <section className="flex flex-col gap-4">
          <header className="flex items-end gap-3 w-full">
            <TicketSearch
              value={filters.search}
              isLoading={isLoading}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
            />

            <TicketFilters
              status={filters.status}
              onStatusChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  status: value as TicketFiltersType["status"],
                }))
              }
              priority={filters.priority}
              onPriorityChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  priority: value as TicketFiltersType["priority"],
                }))
              }
              activeFiltersCount={activeFiltersCount}
            />
          </header>
        </section>

        <TicketGrid
          tickets={tickets}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
          sentinelRef={sentinelRef}
          onView={(ticket) => {
            setActiveModal({ type: "detail", ticket });
          }}
          onEdit={(ticket) => {
            setActiveModal({ type: "edit", ticket });
          }}
          onDelete={(ticket) => {
            setActiveModal({ type: "delete", ticket });
          }}
          onClearFilters={() => {
            setFilters(INITIAL_FILTERS);
          }}
        />
      </div>

      <TicketModalManager
        activeModal={activeModal}
        userId={user?.id}
        onTicketsUpdated={(newTickets) => {
          setTickets(newTickets);
          setPage(1);
          setHasMore(newTickets.length >= DEFAULT_PAGE_SIZE);
        }}
        onOpenChange={() => {
          closeModal();
        }}
      />
    </main>
  );
}
