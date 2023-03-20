<template>
  <v-dialog v-model="showModal" width="70%">
    <ImageModal :imgId="imgId" @galleryUpdated="refreshGallery" />
  </v-dialog>

  <div class="d-flex flex-column align-start pa-2">
    <div class="d-flex flex-wrap">
      <div v-for="img in store.images" :key="img.id">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :class="{ 'on-hover': isHovering }"
            class="ma-4 rounded-lg elevation-6"
            width="250"
            max-height="300"
            color="rgba(20, 20, 20)"
            @click="openModal(img.id)"
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
import { supabase } from "../lib/supabase";
import { Image } from "../lib/database.types";
import { ref, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import ImageModal from "./ImageModal.vue";

const store = useAppStore();

const imgId = ref(0);
const showModal = ref(false);
// const loadMore = ref(false);

onMounted(() => {
  getImagesBatch();
});

const getImagesBatch = async () => {
  const images = store.images;

  const sortedImages = images.slice().sort((a, b) => a.id - b.id);
  let lastImgId = images.length === 0 ? 0 : sortedImages[0].id;

  if (lastImgId === 0) {
    // firstImageBatch
    let { data, error: selectError } = await supabase
      .from("images")
      .select()
      .order("id", { ascending: false })
      .limit(12);

    if (selectError) {
      throw selectError;
    }
    store.addImages(data as Image[]);

    // images.length > 11 ? (loadMore.value = true) : (loadMore.value = false);
  } else {
    // nextImageBatch
    let { data, error: selectError } = await supabase
      .from("images")
      .select()
      .lt("id", lastImgId)
      .gte("id", lastImgId - 12)
      .order("id", { ascending: false })
      .limit(12);

    if (selectError) {
      throw selectError;
    }
    store.addImages(data as Image[]);

    // if no more images
    // if (data?.length! < 12) {
    //   loadMore.value = false;
    // }
  }
};

const refreshGallery = () => {
  showModal.value = false;
  store.images = [];
  getImagesBatch();
};

const openModal = (id: number) => {
  imgId.value = id;
  showModal.value = true;
};
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
