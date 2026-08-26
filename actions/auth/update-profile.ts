"use server";

import { ProfileDto } from "@/app/profile/schemas/profile.schema";
import { createClient } from "@/lib/supabase/server";

type updatPeofileDto = Omit<ProfileDto, "email" | "avatar_url"> & {
  id: string;
};
export async function updateProfile(dto: updatPeofileDto) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("profiles").upsert({
      id: dto.id,
      name: dto.name,
      phone: dto.phone?.slice(3),
      country_code: dto.country_code,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    throw error;
  }
}
