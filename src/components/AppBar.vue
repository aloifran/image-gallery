<template>
  <v-app-bar elevation="1" class="px-2" color="bar-bg">
    <div
      v-if="store.isLoggedIn"
      class="d-flex justify-space-between align-center w-100"
    >
      <v-btn
        variant="elevated"
        color="primary"
        prepend-icon="$mdiPlus"
        class="mx-5"
        @click="imageStore.showUploadDialog = !imageStore.showUploadDialog"
        >Upload</v-btn
      >

      <span v-if="store.isLoggedIn">{{ imageStore.totalImages }} images</span>

      <v-text-field
        v-if="store.isLoggedIn"
        variant="solo"
        density="compact"
        label="Search by title or description"
        append-inner-icon="$mdiMagnify"
        single-line
        hide-details
        class="mx-5"
        v-model="imageStore.search"
      />

      <v-spacer />

      <v-btn
        variant="elevated"
        color="primary"
        class="mx-5"
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
