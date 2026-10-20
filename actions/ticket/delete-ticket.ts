"use server";

import { createClient } from "@/lib/supabase/server";
import { getImagePath } from "@/lib/utils";
import { Ticket } from "@/interfaces/tickets";

export async function deleteTicket({
  userId,
  ticketId,
  imageUrl,
}: {
  userId: string;
  ticketId: string;
  imageUrl: string | null;
}): Promise<{ success: boolean; data: Ticket[] }> {
  const supabase = await createClient();
  try {
    if (imageUrl) {
      const imagePath = getImagePath(imageUrl);
      const { error: errorDeleteImage } = await supabase.storage
        .from("tickets-images")
        .remove([imagePath]);
      if (errorDeleteImage) throw errorDeleteImage;
    }
    const { error: errorDeleteTicket } = await supabase
      .from("tickets")
      .delete()
      .eq("id", ticketId)
      .eq("user_id", userId);

    if (errorDeleteTicket) throw errorDeleteTicket;

    const { data: updatedTickets, error: getTicketsError } = await supabase
      .from("tickets")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (getTicketsError) throw getTicketsError;

    return { success: true, data: (updatedTickets as Ticket[]) || [] };
  } catch (error) {
    throw error;
  }
}
