import App from "@/App.vue";
import { createApp } from "vue";
import { useAppStore } from "@/store/app";
import { supabase } from "@/lib/supabase";
import { registerPlugins } from "@/plugins";
import "./styles/_progress-bar.css";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");

supabase.auth.onAuthStateChange((e, session) => {
  // Set user to null in store when no user is authenticated.
  const user = session?.user || null;
  useAppStore().setUser(user);
});
