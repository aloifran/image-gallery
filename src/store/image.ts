import { defineStore } from "pinia";
import { Image } from "../lib/database.types";
import { supabase } from "@/lib/supabase";

// store for image management tasks

interface ImageState {
  showUploaderDialog: boolean;
  showImageDialogPreview: boolean;
  showImageDialogDelete: boolean;
  images: Image[];
  image: null | Image;
  imgId: null | number;
  prettyDate: string;
}

export const useImageStore = defineStore("image", {
  state: (): ImageState => ({
    showUploaderDialog: false,
    showImageDialogPreview: false,
    showImageDialogDelete: false,
    images: new Array<Image>(),
    imgId: null,
    image: null,
    prettyDate: "",
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
      this.getImageData();
      this.showImageDialogPreview = true;
    },

    refreshGallery() {
      this.showImageDialogPreview = false;
      this.showImageDialogDelete = false;
      this.images = [];
      this.getImagesBatch();
    },

    async getImageData() {
      const { data: image, error: selectError } = await supabase
        .from("images")
        .select()
        .eq("id", this.imgId)
        .single();

      if (selectError) {
        throw selectError;
      }

      this.image = image;
      this.prettyDate = new Date(image!.created_at).toLocaleDateString("de-DE");
    },

    resetImageData() {
      // do this against a default object?
      this.image = null;
      this.imgId = null;
      this.prettyDate = "";
    },

    // TODO: refactor edit image data logic
    // async editimage() {
    //   const { error: updateError } = await supabase
    //     .from("images")
    //     .update({
    //       title: this.image!.title,
    //       description: this.image!.description,
    //     })
    //     .eq("id", this.imgId);

    //   if (updateError) {
    //     throw updateError;
    //   }

    //   showEdit.value = false;
    //   this.getImageData();

    //   this.refreshGallery();
    // },

    async deleteImage() {
      const filePath = this.image!.url.split("images/")[1].split("?")[0];

      const { error: deleteStorageError } = await supabase.storage
        .from("images")
        .remove([filePath]);
      if (deleteStorageError) {
        throw deleteStorageError;
      }

      const { error: deleteDbError } = await supabase
        .from("images")
        .delete()
        .eq("id", this.imgId);
      if (deleteDbError) {
        throw deleteDbError;
      }

      this.refreshGallery();
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
