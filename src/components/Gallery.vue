<template>
  <div class="d-flex flex-column align-start pa-2">
    <div class="d-flex flex-wrap">
      <!-- ImageCard loop -->
      <div class="pa-3" v-for="img in imageStore.images" :key="img.id">
        <ImageCard v-bind="{ img }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useImageStore } from "@/store/image";
import ImageCard from "./ImageCard.vue";

const imageStore = useImageStore();

onMounted(() => {
  imageStore.getImagesBatch();
});
</script>
