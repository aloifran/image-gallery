<template>
  <v-app-bar class="bg-grey-darken-4">
    <v-btn
      variant="outlined"
      prepend-icon="fas fa-plus"
      class="my-10 mx-5"
      @click="store.showDialogForm = !store.showDialogForm"
      >Add an image</v-btn
    >
    <v-btn variant="outlined" class="my-10 mx-5" @click="signOut"
      >Sign out</v-btn
    >
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { supabase } from "@/lib/supabase";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useAppStore();

async function signOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw error;
  router.push("sign-in");
}
</script>
