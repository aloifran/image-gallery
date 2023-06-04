<template>
  <v-dialog
    scrim="dialog-scrim"
    width="700"
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
        <v-form>
          <v-card-text>
            <v-text-field
              density="compact"
              v-model="imageStore.image!.title"
              :variant="imageStore.showEditableFields ? 'outlined' : 'plain'"
              :class="{
                'not-clickable title': !imageStore.showEditableFields,
                title: imageStore.showEditableFields,
              }"
            />
            <v-text-field
              density="compact"
              v-model="imageStore.image!.description"
              :variant="imageStore.showEditableFields ? 'outlined' : 'plain'"
              :class="{ 'not-clickable': !imageStore.showEditableFields }"
            />
          </v-card-text>

          <v-card-subtitle
            >Uploaded on {{ imageStore.prettyDate }}</v-card-subtitle
          >

          <div class="d-flex mt-6 mb-2">
            <v-btn variant="elevated" class="mx-4" @click="handleClickChange">{{
              imageStore.showEditableFields ? "Save" : "Edit"
            }}</v-btn>

            <v-btn
              variant="elevated"
              color="error"
              @click="handleClickCancelDelete"
              >{{ imageStore.showEditableFields ? "Cancel" : "Delete" }}</v-btn
            >
          </div>
        </v-form>
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

const handleClickChange = () => {
  if (!imageStore.showEditableFields) {
    // edit
    imageStore.showEditableFields = true;
    return;
  }
  if (imageStore.showEditableFields) {
    // save
    imageStore.showEditableFields = false;
    imageStore.updateImageData();
    return;
  }
};

const handleClickCancelDelete = () => {
  if (!imageStore.showEditableFields) {
    // delete
    imageStore.showImageDialogDelete = true;
    return;
  }
  if (imageStore.showEditableFields) {
    // cancel
    imageStore.showEditableFields = false;
    imageStore.restoreImageBackup();
    return;
  }
};

// TODO: set proper type to event
// to avoid the previous image to show up while loading the next one
const handleModelChange = (event: any) => {
  emit("update:modelValue", event);

  if (!event) {
    imageStore.resetImageData();
  }
};
</script>

<style>
.v-card-text {
  padding: 0 1rem 1rem;
  margin-bottom: -1rem;
}

.title {
  font-weight: 600;
  font-size: 1.5rem !important;
  margin-bottom: -1rem;
}

.not-clickable {
  pointer-events: none;
}
</style>
