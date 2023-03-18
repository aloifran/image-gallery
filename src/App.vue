<template>
  <component :is="layout"></component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/Default.vue";

const route = useRoute();

// handle layouts
const layout = computed(() => {
  return route.meta.layout || DefaultLayout;
});
</script>
