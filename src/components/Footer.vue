<template>
  <v-footer class="px-6" color="bar-bg" app>
    <div class="d-flex align-center">
      <p>Francisco Aloi - 2023</p>
      <div>
        <v-btn
          target="_blank"
          href="https://github.com/aloifran/image-board"
          v-ripple="false"
          variant="text"
          class="mr-3"
          size="small"
          icon
        >
          <v-icon size="large"> $mdiGithub </v-icon>
        </v-btn>
      </div>
    </div>
    <ThemeSwitch v-model="store.theme" class="d-flex justify-end mr-2" />
  </v-footer>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>
