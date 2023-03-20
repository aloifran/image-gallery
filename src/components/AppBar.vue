<template>
  <v-app-bar elevation="1" class="justify-center" color="appbar-background">
    <div v-if="store.isLoggedIn">
      <v-btn
        variant="outlined"
        prepend-icon="$mdiPlus"
        class="my-10 mx-5"
        @click="store.showDialogForm = !store.showDialogForm"
        >Add an image</v-btn
      >
      <v-btn variant="outlined" class="my-10 mx-5" @click="store.signOut"
        >Sign out</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";

const store = useAppStore();
</script>
