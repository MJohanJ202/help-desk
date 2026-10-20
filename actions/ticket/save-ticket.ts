"use server";

import { createClient } from "@/lib/supabase/server";
import { TicketFormData } from "@/app/dashboard/schemas/ticket.schema";
import { normalizeKeyFileName } from "@/lib/utils";
import { Ticket } from "@/interfaces/tickets";

export type TicketData = TicketFormData & {
  image: File;
  userId: string;
};

export async function saveTicket(
  shape: FormData,
): Promise<{ success: boolean; data: Ticket[] }> {
  try {
    const supabase = await createClient();
    const {
      image: file,
      userId,
      ...dto
    } = Object.fromEntries(shape.entries()) as unknown as TicketData;

    if (!file || !userId) throw new Error("No file upload");
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

    const { data: dataGetUrl } = supabase.storage
      .from("tickets-images")
      .getPublicUrl(filePath);

    if (!dataGetUrl.publicUrl)
      throw new Error("No se pudo obtener la URL pública");

    const { error: saveTicketError } = await supabase
      .from("tickets")
      .insert({
        title: dto.title,
        priority: dto.priority,
        status: dto.status,
        description: dto.description,
        image_url: dataGetUrl.publicUrl,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (saveTicketError) throw saveTicketError;

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
