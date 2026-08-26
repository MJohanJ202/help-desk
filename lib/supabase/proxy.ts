import { getUser } from "@/actions/auth/get-user";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  PROFILE_ROUTES,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
} from "../routes/auth";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const user = await getUser();
  const currentPath = request.nextUrl.pathname;

  if (!user && PROTECTED_ROUTES.includes(currentPath)) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTES.HOME, request.url));
  }

  if (user && currentPath === PUBLIC_ROUTES.HOME) {
    return NextResponse.redirect(
      new URL(PROFILE_ROUTES.DASHBOARD, request.url),
    );
  }

  return supabaseResponse;
}
