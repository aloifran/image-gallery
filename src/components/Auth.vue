<template>
  <v-container class="text-center">
    <v-card class="bg-grey-darken-4 rounded elevation-12">
      <v-container v-if="!showSignUp">
        <v-card-title>Sign in</v-card-title>
        <v-container>
          <v-form
            class="d-flex flex-column pa-2"
            @submit.prevent="signInCredentials"
          >
            <v-text-field v-model="email" label="Email" />
            <v-text-field v-model="password" label="Password" />
            <v-btn type="submit" color="primary">Sign In</v-btn>
          </v-form>
        </v-container>
      </v-container>

      <v-container v-if="showSignUp">
        <v-card-title>Sign up</v-card-title>
        <v-container>
          <v-form class="d-flex flex-column pa-2" @submit.prevent="signUp">
            <v-text-field v-model="email" label="Email" />
            <v-text-field v-model="password" label="Password" />
            <v-btn type="submit" color="primary">Sign Up</v-btn>
          </v-form>
        </v-container>
      </v-container>

      <v-card-actions>
        <v-card-subtitle>Or continue with</v-card-subtitle>
        <v-btn @click="signInProvider"> Google </v-btn>
      </v-card-actions>
    </v-card>

    <v-btn v-if="!showSignUp" variant="plain" @click="() => (showSignUp = true)"
      >or sign up</v-btn
    >
    <v-btn v-else variant="plain" @click="() => (showSignUp = false)"
      >or sign in</v-btn
    >
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../lib/supabase";
import { useAppStore } from "@/store/app";

const store = useAppStore();
const loading = ref(false);
const showSignUp = ref(false);
const email = ref("");
const password = ref("");

const signUp = async () => {
  let { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
};

const signInCredentials = async () => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
};

const signInProvider = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>
