<template>
  <Gallery />
  <UploadForm v-model="imageStore.showDialogForm" />
</template>

<script setup lang="ts">
import Gallery from "@/components/Gallery.vue";
import UploadForm from "@/components/UploadForm.vue";
import { useImageStore } from "@/store/image";

const imageStore = useImageStore();
</script>
