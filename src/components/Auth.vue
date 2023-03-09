<template>
  <v-card class="bg-grey-darken-4 text-white rounded elevation-12">
    <v-card-title>Sign in</v-card-title>
    <v-card-subtitle v-if="loading">Signing you in...</v-card-subtitle>
    <v-card-actions v-else>
      <v-btn @click="signIn"> Google </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../lib/supabase";

const loading = ref(false);

const signIn = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>
