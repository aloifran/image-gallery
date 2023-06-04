import { defineStore } from "pinia";
import { ImageWithBackup } from "../lib/database.types";
import { supabase } from "@/lib/supabase";

// store for image management tasks

interface uploadForm {
  title: string;
  description: string;
  file: null | File;
}

interface ImageState {
  showUploadDialog: boolean;
  showImageDialogPreview: boolean;
  showImageDialogDelete: boolean;
  showEditableFields: boolean;
  images: ImageWithBackup[];
  image: null | ImageWithBackup;
  imgId: null | number;
  prettyDate: string;
  uploadForm: uploadForm;
}

const uploadFormDefaults: uploadForm = {
  title: "",
  description: "",
  file: null,
};

export const useImageStore = defineStore("image", {
  state: (): ImageState => ({
    showUploadDialog: false,
    showImageDialogPreview: false,
    showImageDialogDelete: false,
    showEditableFields: false,
    images: new Array<ImageWithBackup>(),
    imgId: null,
    image: null,
    prettyDate: "",
    uploadForm: uploadFormDefaults,
  }),

  actions: {
    addImage(image: ImageWithBackup) {
      this.images.unshift(image);
    },

    openImageDialog(img: ImageWithBackup) {
      this.showImageDialogPreview = true;
      this.image = img;
      this.imgId = img.id;
      this.prettyDate = new Date(img.created_at).toLocaleDateString("de-DE");
    },

    resetUploadForm() {
      this.uploadForm = uploadFormDefaults;
    },

    resetImageData() {
      this.image = null;
      this.imgId = null;
      this.prettyDate = "";
    },

    restoreImageBackup() {
      // if text values have changed, restore previous
      if (
        this.image!.title != this.image!.backup!.title ||
        this.image!.description != this.image!.backup!.description
      ) {
        this.image = Object.assign(this.image!, this.image, this.image?.backup);
      }
    },

    async updateImageData() {
      const { error: updateError } = await supabase
        .from("images")
        .update({
          title: this.image!.title,
          description: this.image!.description,
        })
        .eq("id", this.imgId);

      if (updateError) {
        throw updateError;
      }

      // after update, set backup to reflect change
      this.image!.backup!.title = this.image!.title;
      this.image!.backup!.description = this.image!.description;

      this.showEditableFields = false;
    },

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

      // Update gallery array.
      const updatedImages = this.images.filter((img) => img !== this.image);
      this.addBackupToImageArray(updatedImages);

      this.showImageDialogPreview = false;
      this.showImageDialogDelete = false;
    },

    async getImagesBatch() {
      const { data, error: selectError } = await supabase
        .from("images")
        .select()
        .order("id", { ascending: false });

      if (selectError) {
        throw selectError;
      }

      this.addBackupToImageArray(data);

      //TODO: apply a pagination strategy to get more images
      // get the nextImageBatch
      // const { data, error: selectError } = await supabase
      //   .from("images")
      //   .select()
      //   .lt("id", lastImgId)
      //   .gte("id", lastImgId - 12)
      //   .order("id", { ascending: false })
      //   .limit(12);

      // if (selectError) {
      //   throw selectError;
      // }
      // this.addImages(data as Image[]);
    },

    // Adds a backup to each image, to keep initial values
    addBackupToImageArray(imageArray: ImageWithBackup[]) {
      this.images = imageArray.map((img) => {
        return { ...img, backup: { ...img } };
      });
    },
  },
});
