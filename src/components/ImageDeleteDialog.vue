<template>
  <v-dialog
    scrim="dialog-scrim"
    width="300"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card class="justify-center align-center pa-5">
      <v-card-title>Delete Image</v-card-title>
      <v-card-subtitle>Are you sure?</v-card-subtitle>
      <div class="d-flex mt-5">
        <v-btn
          class="mx-4"
          variant="outlined"
          @click="imageStore.showImageDialogDelete = false"
          >Cancel</v-btn
        >
        <v-btn variant="outlined" color="error" @click="imageStore.deleteImage"
          >Delete</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useImageStore } from "@/store/image";

defineProps<{ modelValue: boolean }>();
const imageStore = useImageStore();
</script>
