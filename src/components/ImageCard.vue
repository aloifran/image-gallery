<template>
  <v-card
    class="mx-auto rounded-lg elevation-4"
    width="250"
    max-height="300"
    @click="imageStore.openImageDialog(img)"
  >
    <v-img height="200" cover :src="img.url" :alt="img.title!">
      <template v-slot:placeholder>
        <Loader />
      </template>
    </v-img>
    <v-card-title class="text-subtitle-1 font-weight-regular">{{
      img.title
    }}</v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { Image } from "../lib/database.types";
import { useImageStore } from "@/store/image";
import Loader from "./Loader.vue";

defineProps<{ img: Image }>();
const imageStore = useImageStore();
</script>
