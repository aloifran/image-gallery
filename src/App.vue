<template>
  <v-app :theme="store.theme">
    <AppBar />
    <component :is="layout"></component>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/app";

// Components
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";

const store = useAppStore();
const route = useRoute();

// Handle layouts
const layout = computed(() => {
  return route.meta.layout;
});
</script>
