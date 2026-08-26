import { PUBLIC_ROUTES } from "@/lib/routes/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath(PUBLIC_ROUTES.HOME, "layout");
  return NextResponse.redirect(new URL(PUBLIC_ROUTES.HOME, req.url), {
    status: 302,
  });
}
