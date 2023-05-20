<template>
  <Gallery />
  <ImageUploadDialog v-model="imageStore.showUploadDialog" />
  <ImagePreviewDialog v-model="imageStore.showImageDialogPreview" />
  <ImageDeleteDialog v-model="imageStore.showImageDialogDelete" />
  <SignOutDialog v-model="store.showSignOutDialog" />
</template>

<script setup lang="ts">
import { watch } from "vue";
import Gallery from "@/components/Gallery.vue";
import ImageUploadDialog from "@/components/ImageUploadDialog.vue";
import ImagePreviewDialog from "@/components/ImagePreviewDialog.vue";
import ImageDeleteDialog from "@/components/ImageDeleteDialog.vue";
import { useAppStore } from "@/store/app";
import { useImageStore } from "@/store/image";
import SignOutDialog from "@/components/SignOutDialog.vue";

const imageStore = useImageStore();
const store = useAppStore();

// watch if showUploaderDialog is closed and reset its values
watch(
  () => imageStore.showUploadDialog,
  (newValue) => {
    if (newValue) {
      imageStore.resetUploadForm();
    }
  }
);
</script>
