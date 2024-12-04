import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  session: Session | null;
  user: any;
  loading: boolean;
  initializeAuth: () => void;
  setAuthState: (session: Session | null) => void;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signOut: () => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      session: null,
      user: null,
      loading: false,
      initializeAuth: async () => {
        const session = await supabase.auth.getSession();
        set({
          session: session?.data?.session || null,
          user: session?.data?.session?.user || null,
          loading: false,
        });
      },
      setAuthState: (session) => {
        set({ session, user: session?.user || null, loading: false });
      },
      signIn: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          throw error;
        }
      },
      signUp: async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          throw error;
        }
      },
      signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
      },
    }),
    {
      name: "thechat-auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
