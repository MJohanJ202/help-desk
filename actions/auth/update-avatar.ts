"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateAvatar(
  formData: FormData,
): Promise<{ url: string }> {
  try {
    const supabase = await createClient();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) throw new Error("No file upload");

    const extensionFile = file.name.split(".").pop();
    const filePath = `${userId}.${extensionFile}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    if (!publicUrlData.publicUrl)
      throw new Error("No se pudo obtener la URL pública");

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar_url: publicUrlData.publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (updateError) throw updateError;

    return { url: publicUrlData.publicUrl };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
