<template>
  <div class="d-flex align-center justify-center my-2">
    <!-- Google -->
    <v-btn
      icon
      color="primary"
      variant="tonal"
      @click="store.signInProvider('google')"
    >
      <v-icon>$mdiGoogle</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
