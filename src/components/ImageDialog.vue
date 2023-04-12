<template>
  <v-container class="bg-grey-darken-4 text-center rounded elevation-12 pa-0">
    <v-card class="bg-black text-white" min-height="500">
      <v-img :src="img.url" :alt="img.title!" max-height="450" />

      <v-container v-if="!showEdit" class="bg-grey-darken-4">
        <v-card-title class="text-h5">{{ img.title }}</v-card-title>
        <v-card-text class="font-weight-light">{{
          img.description
        }}</v-card-text>
        <v-card-subtitle>Uploaded on {{ prettyDate }}</v-card-subtitle>
        <v-card-actions class="justify-center">
          <v-btn
            class="mx-2"
            size="small"
            variant="outlined"
            @click="showEdit = true"
            >Edit</v-btn
          >
          <v-btn size="small" variant="outlined" @click="showDelete = true"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-container>

      <v-container
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
      </v-container>
    </v-card>

    <v-dialog v-model="showDelete" width="300">
      <v-card class="bg-black justify-center align-center">
        <v-card-title class="text-white">Are you sure?</v-card-title>
        <v-card-actions>
          <v-btn
            class="text-white"
            size="small"
            variant="outlined"
            @click="showDelete = false"
            >Cancel</v-btn
          >
          <v-btn
            class="text-white"
            size="small"
            variant="outlined"
            @click="deleteImage"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabase";
import { Image } from "../lib/database.types";

const props = defineProps<{ imgId: number | null }>();
const emit = defineEmits(["galleryUpdated"]);
const img = ref({} as Image);
const prettyDate = ref("");
const showDelete = ref(false);
const showEdit = ref(false);

onMounted(async () => {
  getImageData();
});

const getImageData = async () => {
  let { data: image, error: selectError } = await supabase
    .from("images")
    .select()
    .eq("id", props.imgId)
    .single();
  if (selectError) {
    throw selectError;
  }
  img.value = image!;
  prettyDate.value = new Date(image!.created_at).toLocaleDateString("de-DE");
};

const editImage = async () => {
  let { error: updateError } = await supabase
    .from("images")
    .update({
      title: img.value.title,
      description: img.value.description,
    })
    .eq("id", props.imgId);

  if (updateError) {
    throw updateError;
  }
  showEdit.value = false;
  getImageData();
  emit("galleryUpdated");
};

const deleteImage = async () => {
  const filePath = img.value.url.split("images/")[1].split("?")[0];

  let { error: deleteStorageError } = await supabase.storage
    .from("images")
    .remove([filePath]);
  if (deleteStorageError) {
    throw deleteStorageError;
  }

  let { error: deleteDbError } = await supabase
    .from("images")
    .delete()
    .eq("id", props.imgId);
  if (deleteDbError) {
    throw deleteDbError;
  }
  emit("galleryUpdated");
};
</script>
