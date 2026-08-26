"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/interfaces/user";
import { getUser } from "@/actions/auth/get-user";
import { createClient } from "@/lib/supabase/client";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  getUserData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserData = async () => {
    setIsLoading(true);

    try {
      const user = await getUser();
      setUser(user);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const authState = useCallback(async () => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event, session) => {
      const eventTypes = [
        "INITIAL_SESSION",
        "USER_UPDATED",
        "TOKEN_REFRESH",
        "PASSWORD_RECOVERY",
        "SIGN_OUT",
      ];

      if (eventTypes.includes(event)) {
        if (session) {
          getUserData();
        } else {
          setUser(null);
        }
      }
    });
  }, []);

  useEffect(() => {
    authState();
  }, [authState]);

  return (
    <AuthContext.Provider value={{ user, isLoading, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
