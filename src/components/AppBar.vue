<template>
  <v-app-bar elevation="1" class="px-2" color="bar-bg">
    <div v-if="store.isLoggedIn" class="d-flex justify-space-between w-100">
      <v-btn
        variant="elevated"
        color="primary"
        prepend-icon="$mdiPlus"
        class="my-10 mx-5"
        @click="imageStore.showUploadDialog = !imageStore.showUploadDialog"
        >Upload</v-btn
      >
      <v-btn
        variant="elevated"
        color="primary"
        class="my-10 mx-5"
        @click="store.showSignOutDialog = true"
        >Sign out</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { useImageStore } from "@/store/image";

const store = useAppStore();
const imageStore = useImageStore();
</script>
