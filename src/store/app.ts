import { defineStore } from "pinia";
import { Image } from "../lib/database.types";
import type { User } from "@supabase/gotrue-js/src/lib/types";

export const useAppStore = defineStore("app", {
  state: () => ({
    showDialogForm: false,
    images: new Array<Image>(),
    user: null as User | null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    addImages(images: Image[]) {
      this.images.push(...images);
    },
    addImage(image: Image) {
      this.images.unshift(image);
    },
  },
  getters: {
    // !! transforms result into boolean
    isLoggedIn: (state) => !!state.user,
  },
});
