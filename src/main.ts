import App from "@/App.vue";
import { createApp } from "vue";
import { useAppStore } from "@/store/app";
import { supabase } from "@/lib/supabase";
import { registerPlugins } from "@/plugins";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");

supabase.auth.onAuthStateChange((e, session) => {
  if (session) {
    useAppStore().setUser(session.user);
  }
});
