"use server";

import { createClient } from "@/lib/supabase/server";
import { Ticket, TicketFiltersType } from "@/interfaces/tickets";
import { DEFAULT_PAGE_SIZE } from "@/lib/tickets";

type Props = {
  userId: string;
  filters?: Partial<TicketFiltersType>;
  page?: number;
  pageSize?: number;
};

export type GetTicketsResponse = {
  success: boolean;
  data: Ticket[];
  hasMore: boolean;
  totalCount: number;
  page: number;
};

export async function getTickets({
  userId,
  filters,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: Props): Promise<GetTicketsResponse> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("tickets")
      .select("*", { count: "exact" })
      .eq("user_id", userId);

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    if (filters?.priority && filters.priority !== "all") {
      query = query.eq("priority", filters.priority);
    }

    if (filters?.search && filters.search.trim() !== "") {
      const cleanSearch = filters.search.trim().replace(/[,()]/g, "");
      if (cleanSearch) {
        query = query.or(
          `title.ilike.%${cleanSearch}%,description.ilike.%${cleanSearch}%`,
        );
      }
    }

    const currentPage = page > 0 ? page : 1;
    const limit = pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE;
    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;

    const {
      error,
      data: dataTickets,
      count,
    } = await query.order("created_at", { ascending: false }).range(from, to);

    if (error) throw error;

    const totalCount = count ?? 0;
    const hasMore =
      count !== null ? to + 1 < count : (dataTickets?.length ?? 0) === limit;

    return {
      success: true,
      data: (dataTickets as Ticket[]) || [],
      hasMore,
      totalCount,
      page: currentPage,
    };
  } catch (error) {
    throw error;
  }
}
