<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    width="500"
    scrim="dialog-scrim"
  >
    <v-card class="elevation-12">
      <v-container>
        <v-card-title class="text-center">Upload an image</v-card-title>
        <v-form
          class="d-flex flex-column pa-2"
          ref="form"
          validate-on="submit"
          @submit.prevent="uploadImage"
        >
          <v-text-field
            v-model="title"
            label="Title"
            variant="outlined"
            density="compact"
            class="my-2"
          />
          <v-text-field
            v-model="description"
            label="Description"
            variant="outlined"
            density="compact"
            class="my-2"
          />
          <v-file-input
            label="File"
            variant="underlined"
            density="compact"
            accept="image/*"
            class="my-2"
            :rules="formRules"
            @change="handleFile"
          />
          <div class="d-flex justify-center">
            <v-btn
              variant="outlined"
              class="mx-4"
              @click="imageStore.showUploadDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              type="submit"
              variant="elevated"
              color="primary"
              :loading="loading"
            >
              Upload
            </v-btn>
          </div>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../lib/supabase";
import { useImageStore } from "@/store/image";
import { useAppStore } from "@/store/app";
import { Image } from "../lib/database.types";

defineProps<{ modelValue: boolean }>();

const store = useAppStore();
const imageStore = useImageStore();

const { id } = store.user!;
const form = ref();
const file = ref();
const title = ref("");
const description = ref("");
const loading = ref(false);

const formRules = [
  // required
  (value: string) => (value ? true : "Please fill out this field."),
];

const uploadImage = async () => {
  // form validation
  const { valid } = await form.value.validate();
  if (!valid) return;

  // upload to storage
  loading.value = true;
  const fileExt = file.value.name.split(".").pop();
  const filePath = `${id}/${Math.random()}.${fileExt}`;
  let fileUrl;

  let { error: uploadError } = await supabase.storage
    .from("images")
    .upload(filePath, file.value);
  if (uploadError) {
    throw uploadError;
  }
  fileUrl = await supabase.storage.from("images").getPublicUrl(filePath).data
    .publicUrl;

  // insert into images
  let { error: insertError } = await supabase.from("images").insert({
    title: title.value,
    description: description.value,
    url: fileUrl,
    user_id: id,
  });
  if (insertError) {
    throw insertError;
  }
  addImage(fileUrl);
  loading.value = false;
  form.value.reset();
  imageStore.showUploadDialog = !imageStore.showUploadDialog;
};

const addImage = async (fileUrl: string) => {
  let { data: img, error } = await supabase
    .from("images")
    .select()
    .eq("url", fileUrl)
    .single();

  if (error) {
    throw error;
  }
  imageStore.addImage(img as Image);
};

const handleFile = (e: Event) => {
  file.value = (e.target as HTMLInputElement).files?.item(0) as File;
};
</script>
