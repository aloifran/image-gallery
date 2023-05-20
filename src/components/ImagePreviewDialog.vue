<template>
  <v-dialog
    scrim="dialog-scrim"
    width="600"
    :model-value="modelValue"
    @update:model-value="handleModelChange"
  >
    <v-card v-if="imageStore.image">
      <v-img
        :src="imageStore.image!.url"
        :alt="imageStore.image!.title!"
        max-height="500"
      >
        <template v-slot:placeholder>
          <Loader />
        </template>
      </v-img>

      <v-container>
        <v-card-title class="text-h5">{{
          imageStore.image!.title
        }}</v-card-title>
        <v-card-text class="font-weight-light">{{
          imageStore.image!.description
        }}</v-card-text>
        <v-card-subtitle
          >Uploaded on {{ imageStore.prettyDate }}</v-card-subtitle
        >

        <div class="d-flex mt-4">
          <!-- @click="showEdit = true" -->
          <v-btn variant="outlined" class="mx-4">Edit</v-btn>
          <v-btn
            variant="outlined"
            color="error"
            @click="imageStore.showImageDialogDelete = true"
            >Delete</v-btn
          >
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useImageStore } from "@/store/image";
import Loader from "./Loader.vue";

const emit = defineEmits(["update:modelValue"]);
defineProps<{ modelValue: boolean }>();
const imageStore = useImageStore();

const handleModelChange = (event: any) => {
  emit("update:modelValue", event);

  if (!event) {
    imageStore.resetImageData();
  }
};
</script>

<!-- EDIT IMAGE -->
<!-- <v-container
      v-else
      class="d-flex justify-center align-center bg-grey-darken-4"
    >
      <v-form class="d-flex flex-column w-25" @submit.prevent="editImage">
        <v-text-field
          label="Title"
          v-model="img.title"
          variant="outlined"
          density="compact"
        />
        <v-textarea
          label="Description"
          v-model="img.description"
          variant="outlined"
          density="compact"
          no-resize
        />
        <v-container>
          <v-btn
            class="mx-2"
            size="small"
            variant="outlined"
            @click="showEdit = false"
          >
            Cancel
          </v-btn>
          <v-btn size="small" variant="outlined" type="submit"> Save </v-btn>
        </v-container>
      </v-form>
    </v-container> -->
