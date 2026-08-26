export const PUBLIC_ROUTES = {
  HOME: "/",
};

export const AUTH_ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  RECOVERY_PASSWORD: "/recovery-password",
};

export const PROFILE_ROUTES = {
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
};

export const PROTECTED_ROUTES = [
  PROFILE_ROUTES.DASHBOARD,
  PROFILE_ROUTES.PROFILE,
  AUTH_ROUTES.RECOVERY_PASSWORD,
];
