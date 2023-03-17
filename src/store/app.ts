import { defineStore } from "pinia";
import { Image } from "../lib/database.types";

export const useAppStore = defineStore("app", {
  state: () => ({
    showDialogForm: false,
    images: new Array<Image>(),
    user: null,
  }),
  actions: {
    setUser(session: any) {
      this.user = session;
    },
    addImages(images: Image[]) {
      this.images.push(...images);
    },
    addImage(image: Image) {
      this.images.unshift(image);
    },
  },
});
