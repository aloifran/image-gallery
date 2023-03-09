<template>
  <Gallery />
  <UploadForm v-model="store.showDialogForm" />
</template>

<script setup lang="ts">
import Gallery from "@/components/Gallery.vue";
import UploadForm from "@/components/UploadForm.vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();
</script>
