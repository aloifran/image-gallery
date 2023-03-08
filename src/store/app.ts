import { defineStore } from "pinia";
import { Image } from "../lib/database.types";

export const useAppStore = defineStore("app", {
  state: () => ({
    showDialogForm: false,
    images: new Array<Image>(),
  }),
  actions: {
    addImages(images: Image[]) {
      this.images.push(...images);
    },
    addImage(image: Image) {
      this.images.unshift(image);
    },
  },
});
