import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import { Image } from "../lib/database.types";
// import type { User } from "@supabase/gotrue-js/src/lib/types";

export const useAppStore = defineStore("app", {
  state: () => ({
    showDialogForm: false,
    images: new Array<Image>(),
    user: null,
    theme: "dark",
  }),

  actions: {
    // TODO: fix type to remove any
    setUser(user: any) {
      this.user = user;
    },
    addImages(images: Image[]) {
      this.images.push(...images);
    },
    addImage(image: Image) {
      this.images.unshift(image);
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // @ts-ignore
      this.router.push("sign-in");
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  // persists only selected theme
  persist: {
    paths: ["theme"],
  },
});
