<template>
  <v-container
    class="d-flex flex-column fill-height align-center justify-center mx-auto"
  >
    <v-card width="400" class="rounded-lg elevation-4">
      <v-container v-if="!showSignUp">
        <v-card-title class="text-center">Sign in</v-card-title>
        <v-form
          class="d-flex flex-column pa-2"
          ref="form"
          validate-on="submit"
          @submit.prevent="signIn"
        >
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="formRules"
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="formRules"
          />
          <v-btn type="submit" color="primary">Sign In</v-btn>
        </v-form>
      </v-container>

      <v-container v-if="showSignUp">
        <v-card-title class="text-center">Sign up</v-card-title>
        <v-form
          class="d-flex flex-column pa-2"
          ref="form"
          validate-on="submit"
          @submit.prevent="signUp"
        >
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="formRules"
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="formRules"
          />
          <v-btn type="submit" color="primary">Sign Up</v-btn>
        </v-form>
      </v-container>

      <v-card-actions class="justify-center">
        <AuthProviders />
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
import AuthProviders from "@/components/AuthProviders.vue";
import { ref } from "vue";
import { supabase } from "../lib/supabase";
import { useRouter } from "vue-router";

const router = useRouter();
const showSignUp = ref(false);
const email = ref("");
const password = ref("");
const form = ref();

const formRules = [
  // required
  (value: string) => (value ? true : "Please fill out this field."),
];

const signUp = async () => {
  // form validation
  const { valid } = await form.value.validate();
  if (!valid) return;

  let { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) throw error;
  router.push("/");
};

const signIn = async () => {
  // form validation
  const { valid } = await form.value.validate();
  if (!valid) return;

  let { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) throw error;
  router.push("/");
};
</script>
