import { defineStore } from "pinia";
import { Image } from "../lib/database.types";
import { supabase } from "@/lib/supabase";

// store for image management tasks

interface ImageState {
  showDialogForm: boolean;
  showImageDialog: boolean;
  images: Image[];
  imgId: null | number;
}

export const useImageStore = defineStore("image", {
  state: (): ImageState => ({
    showDialogForm: false,
    showImageDialog: false,
    images: new Array<Image>(),
    imgId: null,
  }),

  actions: {
    addImages(images: Image[]) {
      this.images.push(...images);
    },

    addImage(image: Image) {
      this.images.unshift(image);
    },

    openImageDialog(id: number) {
      this.imgId = id;
      this.showImageDialog = true;
    },

    refreshGallery() {
      this.showImageDialog = false;
      this.images = [];
      this.getImagesBatch();
    },

    async getImagesBatch() {
      const images = this.images;

      const sortedImages = images.slice().sort((a, b) => a.id - b.id);
      const lastImgId = images.length === 0 ? 0 : sortedImages[0].id;

      if (lastImgId === 0) {
        // firstImageBatch
        const { data, error: selectError } = await supabase
          .from("images")
          .select()
          .order("id", { ascending: false })
          .limit(12);

        if (selectError) {
          throw selectError;
        }
        this.addImages(data as Image[]);

        // images.length > 11 ? (loadMore.value = true) : (loadMore.value = false);
      } else {
        // nextImageBatch
        const { data, error: selectError } = await supabase
          .from("images")
          .select()
          .lt("id", lastImgId)
          .gte("id", lastImgId - 12)
          .order("id", { ascending: false })
          .limit(12);

        if (selectError) {
          throw selectError;
        }
        this.addImages(data as Image[]);

        // if no more images
        // if (data?.length! < 12) {
        //   loadMore.value = false;
        // }
      }
    },
  },
});
