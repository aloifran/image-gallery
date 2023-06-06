<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      :ripple="false"
      v-bind="props"
      class="mx-auto rounded-lg elevation-4"
      width="250"
      max-height="300"
      @click="imageStore.openImageDialog(img)"
    >
      <!-- overlay on hover -->
      <v-overlay contained :scrim="false" :model-value="isHovering" />
      <v-img height="200" cover :src="img.url" :alt="img.title!">
        <template v-slot:placeholder>
          <Loader />
        </template>

        <div
          v-if="isHovering"
          class="text-subtitle-1 text-white font-weight-regular d-flex flex-column-reverse fill-height pa-4"
        >
          {{ img.title }}
        </div>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import { Image } from "../lib/database.types";
import { useImageStore } from "@/store/image";
import Loader from "./Loader.vue";

defineProps<{ img: Image }>();
const imageStore = useImageStore();
</script>
