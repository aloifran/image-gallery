import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

// store for auth and global app tasks

// TODO: remove any from user, instead add a user type
interface AppState {
  user: any;
  theme: string;
  showSignOutDialog: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    user: null,
    theme: "dark",
    showSignOutDialog: false,
  }),

  actions: {
    setUser(user: any) {
      this.user = user;
    },
    async signInProvider(provider: any) {
      try {
        await supabase.auth.signInWithOAuth({
          provider,
        });
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // @ts-ignore
      this.router.push("sign-in");
      this.showSignOutDialog = false;
    },
  },

  getters: {
    async isLoggedIn(state) {
      let retries = 0;
      const maxRetries = 4;
      while (!state.user && retries < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        retries++;
      }
      return !!state.user; // return true if state.user is truthy.
    },
  },

  // persists only selected theme
  persist: {
    paths: ["theme"],
  },
});
