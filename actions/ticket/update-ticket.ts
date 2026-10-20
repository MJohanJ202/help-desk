"use server";

import { createClient } from "@/lib/supabase/server";
import type { TicketData } from "./save-ticket";
import { getImagePath, normalizeKeyFileName } from "@/lib/utils";
import { Ticket } from "@/interfaces/tickets";

type UpdateTicketData = TicketData & {
  imageUrl: string | null;
  ticketId: string;
};

export async function updateTicket(
  shape: FormData,
): Promise<{ success: boolean; data: Ticket[] }> {
  try {
    const supabase = await createClient();
    const {
      userId,
      imageUrl,
      ticketId,
      image: file,
      ...dto
    } = Object.fromEntries(shape.entries()) as unknown as UpdateTicketData;

    if (!userId) throw new Error("Falta el ID del usuario");
    if (!ticketId) throw new Error("Falta el ID del ticket");

    let finalImageUrl = imageUrl || null;

    const hasNewImage =
      file &&
      typeof file === "object" &&
      "size" in file &&
      (file as File).size > 0 &&
      (file as File).name;

    if (hasNewImage) {
      const filePath = normalizeKeyFileName({
        filename: file.name,
        title: dto.title,
        userId,
      });

      const { error: uploadError } = await supabase.storage
        .from("tickets-images")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("tickets-images")
        .getPublicUrl(filePath);

      if (!urlData.publicUrl)
        throw new Error("No se pudo obtener la URL de la imagen");

      finalImageUrl = urlData.publicUrl;

      if (imageUrl) {
        const oldImagePath = getImagePath(imageUrl);
        await supabase.storage
          .from("tickets-images")
          .remove([oldImagePath]);
      }
    }

    const { error: updateError } = await supabase
      .from("tickets")
      .update({
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
        image_url: finalImageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", ticketId)
      .eq("user_id", userId);

    if (updateError) throw updateError;

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
