<template>
  <Gallery />
  <ImageUploadDialog v-model="imageStore.showUploaderDialog" />
  <ImagePreviewDialog v-model="imageStore.showImageDialogPreview" />
  <ImageDeleteDialog v-model="imageStore.showImageDialogDelete" />
</template>

<script setup lang="ts">
import Gallery from "@/components/Gallery.vue";
import ImageUploadDialog from "@/components/ImageUploadDialog.vue";
import ImagePreviewDialog from "@/components/ImagePreviewDialog.vue";
import ImageDeleteDialog from "@/components/ImageDeleteDialog.vue";
import { useImageStore } from "@/store/image";

const imageStore = useImageStore();
</script>
