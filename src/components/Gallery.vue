<template>
  <v-dialog v-model="imageStore.showImageDialog" width="70%">
    <ImageDialog
      :imgId="imageStore.imgId"
      @galleryUpdated="imageStore.refreshGallery"
    />
  </v-dialog>

  <div class="d-flex flex-column align-start pa-2">
    <div class="d-flex flex-wrap">
      <div v-for="img in imageStore.images" :key="img.id">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :class="{ 'on-hover': isHovering }"
            class="ma-4 rounded-lg elevation-6"
            width="250"
            max-height="300"
            color="rgba(20, 20, 20)"
            @click="imageStore.openImageDialog(img.id)"
          >
            <v-img height="200" cover :src="img.url" :alt="img.title!" />
            <v-card-title class="text-white ma-2">{{ img.title }}</v-card-title>
            <v-overlay
              :model-value="isHovering"
              contained
              scrim="dialog-scrim"
            />
          </v-card>
        </v-hover>
      </div>
    </div>

    <!-- <v-container v-if="loadMore" class="more-container">
      <v-btn variant="tonal" class="more-btn" @click="getImagesBatch"
        >Load more</v-btn
      >
    </v-container> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useImageStore } from "@/store/image";
import ImageDialog from "./ImageDialog.vue";

const imageStore = useImageStore();
// const loadMore = ref(false);

onMounted(() => {
  imageStore.getImagesBatch();
});
</script>

<!-- <style scoped>
.more-container {
  grid-column: 1/-1;
}

.more-btn {
  left: 50%;
  transform: translateX(-50%);
}
</style> -->
