"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@/interfaces/user";

export const getUser = async (): Promise<User | null> => {
  try {
    const supabase = await createClient();
    const {
      data: { user: session },
    } = await supabase.auth.getUser();

    if (!session) {
      return null;
    }

    const userId = session.id;

    const { data: user, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.log(error);
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
